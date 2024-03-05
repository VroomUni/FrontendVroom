import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
  Polyline,
} from "react-native-maps";
import { decode } from "@googlemaps/polyline-codec";
import GeoJSONReader from "jsts/org/locationtech/jts/io/GeoJSONReader";
import GeoJSONWriter from "jsts/org/locationtech/jts/io/GeoJSONWriter";
import { BufferOp } from "jsts/org/locationtech/jts/operation/buffer";
import { useDriverContext } from "./context/DriverContext";
import axios from "axios";

const Map = ({ currentRegion }) => {
  const {
    destinationOrOrigin,
    setPolygonCods,
    setPolylineCods,
    polygonCods,
    polylineCods,
    isToSmu,
  } = useDriverContext();
  const apiKey = "AIzaSyAzrdoZnMVbD3CXIjmhFfTWbsiejAM-H5M";
  const SMUCOORDS = {
    latitude: 36.84598089012623,
    longitude: 10.268806957645351,
  };
  const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${destinationOrOrigin?.coords.latitude},${destinationOrOrigin?.coords.longitude}&destination=${SMUCOORDS.latitude},${SMUCOORDS.longitude}&key=${apiKey}`;
  const mapViewRef = useRef(null);

  useEffect(() => {
    destinationOrOrigin &&
      axios
        .get(apiUrl)
        .then(response => {
          const overviewPath = response.data.routes[0].overview_polyline.points;
          const decodedPolylineCods = decode(overviewPath);
          const geoJsonFeature = {
            type: "LineString",
            coordinates: decodedPolylineCods.map(coord => [coord[0], coord[1]]),
          };

          const geoReader = new GeoJSONReader();
          const geoWriter = new GeoJSONWriter();
          const geometry = geoReader.read(geoJsonFeature);

          // Use BufferOp to buffer the geometry
          const bufferOp = new BufferOp(geometry);
          const distance = 10 / 500.12;
          const bufferedGeometry = bufferOp.getResultGeometry(distance);
          const resultPolygonCods = geoWriter.write(bufferedGeometry);

          setPolygonCods(resultPolygonCods.coordinates[0]);
          setPolylineCods(decodedPolylineCods);
        })
        .catch(error => {
          // Handle errors
          console.error("Error ", error);
          Alert.alert("we encountered a problem");
        });
  }, [destinationOrOrigin]);
  useEffect(() => {
    // Use this useEffect to update the map region when PolylineCods changes
    if (mapViewRef.current && polygonCods) {
      mapViewRef.current.fitToCoordinates(
        polygonCods.map(coord => ({
          latitude: coord[0],
          longitude: coord[1],
        })),
        {
          edgePadding: {
            top: 20,
            bottom: 10,
            right: 10,
            left: 10,
          },
          animated: true,
        }
      );
    }
  }, [polygonCods, destinationOrOrigin, polylineCods]);
  return (
    <MapView
      ref={mapViewRef}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsBuildings={false}
      region={currentRegion.current}
      onRegionChangeComplete={region => (currentRegion.current = region)}>
      {/* destination red marker */}
      {destinationOrOrigin && (
        <Marker
          coordinate={{
            longitude: destinationOrOrigin.coords.longitude,
            latitude: destinationOrOrigin.coords.latitude,
          }}
          pinColor={isToSmu ? "red" : "blue"}
        />
      )}
      <Marker
        // SMU blue marker
        coordinate={{
          longitude: SMUCOORDS.longitude,
          latitude: SMUCOORDS.latitude,
        }}
        pinColor={isToSmu ? "blue" : "red"}
        title='SMU'
      />
      {/* route line in blue */}
      {polylineCods && (
        <Polyline
          coordinates={polylineCods.map(coord => ({
            latitude: coord[0],
            longitude: coord[1],
          }))}
          strokeWidth={2}
          strokeColor='blue'
        />
      )}
      {/* area around the route , green surface */}
      {polygonCods && (
        <Polygon
          coordinates={polygonCods.map(coord => ({
            latitude: coord[0],
            longitude: coord[1],
          }))}
          strokeWidth={3}
          fillColor='rgba(67, 247, 154,0.3)'
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    // width: "100%",
    // height: "70%",
    flex: 6,
  },
  markerFixed: {
    position: "absolute",
    top: "64.5%", // Center vertically
    left: "50%", // Center horizontally
    marginLeft: -24, // Adjust based on half of the marker width
    marginTop: -24, // Adjust based on half of the marker height
  },
  marker: {
    height: 48,
    width: 48,
  },
  PlaceMarkerBtn: {
    position: "absolute",
    top: 250,
    right: 10,
    width: 180,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
});
