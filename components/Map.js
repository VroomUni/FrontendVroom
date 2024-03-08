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



//current region is passed as prop , because the custom marker in parent component needs it
const Map = ({ currentRegion }) => {
 

  //using context/global store for driver state
  const {
    destinationOrOrigin,
    setPolygonCods,
    setPolylineCods,
    polygonCods,
    polylineCods,
    isToSmu,
  } = useDriverContext();
  //to be moved in env file

  const apiKey =process.env.EXPO_PUBLIC_API_KEY;
 

  const SMUCOORDS = {
    "latitude": "36.84598089012623",
    "longitude": "10.268806957645351",
  };

  const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${destinationOrOrigin?.coords.latitude},${destinationOrOrigin?.coords.longitude}&destination=${SMUCOORDS.latitude},${SMUCOORDS.longitude}&key=${apiKey}`;
  const mapViewRef = useRef(null);

  //if  destinationOrOrigin !==null this is the logic to draw the route(polyline) & area(polygon)
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

  // when area , route or destination/origin change , then recenter the camera view on the route
  useEffect(() => {
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
          // destination marker is blue : origin is red 
          pinColor={isToSmu ? "red" : "blue"}
        />
      )}
      <Marker
        // SMU Constant blue marker
        coordinate={{
          longitude: SMUCOORDS.longitude,
          latitude: SMUCOORDS.latitude,
        }}
        pinColor={isToSmu ? "blue" : "red"}
        title='SMU'
      />
      {/* route (polyline) in blue */}
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
  customMarkerFixed: {
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
  placeCustomMarkerBtn: {
    position: "absolute",
    top: 250,
    right: 10,
    width: 180,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
});
