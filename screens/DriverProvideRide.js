import { TouchableOpacity, StyleSheet, Image, View } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
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
import { isPointInPolygon } from "geolib";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DriverRideFromTo from "../components/DriverRideFromTo";
import DriverRideLocationInput from "./DriverRideLocationInput";
import { university } from "react-native-vector-icons";
const DriverProvideRide = ({ navigation, route }) => {
  const [PolylineCods, setPolylineCods] = useState(null);
  const [PolygonCods, setPolygonCods] = useState();
  const apiKey = "AIzaSyAzrdoZnMVbD3CXIjmhFfTWbsiejAM-H5M";

  const SMUCOORDS = {
    latitude: 36.84598089012623,
    longitude: 10.268806957645351,
  };
  const [destinationOrOrigin, setDestinationOrOrigin] = useState(null);

  const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${destinationOrOrigin?.coords.latitude},${destinationOrOrigin?.coords.longitude}&destination=${SMUCOORDS.latitude},${SMUCOORDS.longitude}&key=${apiKey}`;

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

          setPolygonCods(
            resultPolygonCods.coordinates[0].map(elt => ({
              latitude: elt[0],
              longitude: elt[1],
            }))
          );
          setPolylineCods(decodedPolylineCods);
        })
        .catch(error => {
          // Handle errors
          console.error("Error ", error);
        });
  }, [destinationOrOrigin]);

  const [isToSmu, setIsToSmu] = useState(true);
  const [onLocationInputPage, setOnLocationInput] = useState(false);

  const initialRegion = {
    latitude: 36.7277622657912, // Latitude of Tunisia
    longitude: 10.203072895008471, // Longitude of Tunisia

    latitudeDelta: 1, // Zoom level
    longitudeDelta: 1, // Zoom level
  };
  const mapViewRef = useRef(null);
  useEffect(() => {
    // Use this useEffect to update the map region when PolylineCods changes
    if (mapViewRef.current && PolylineCods) {
      mapViewRef.current.fitToCoordinates(PolygonCods, {
        edgePadding: {
          top: 10,
          bottom: 10,
          right: 10,
          left: 10,
        },
        animated: true,
      });
    }
  }, [PolylineCods]);

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      {onLocationInputPage ? (
        //Destination/origin places autocomplete page
        <DriverRideLocationInput
          isToSmu={isToSmu}
          setOnLocationInput={setOnLocationInput}
          setDestinationOrOrigin={setDestinationOrOrigin}
        />
      ) : (
        //Map + from to inputs
        <>
          <DriverRideFromTo
            isToSmu={isToSmu}
            setIsToSmu={setIsToSmu}
            setOnLocationInput={setOnLocationInput}
            destinationOrOrigin={destinationOrOrigin}
          />
          <MapView
            ref={mapViewRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsBuildings={false}
            initialRegion={initialRegion}>
            {destinationOrOrigin && (
              <Marker
                coordinate={{
                  longitude: destinationOrOrigin.coords.longitude,
                  latitude: destinationOrOrigin.coords.latitude,
                }}
              />
            )}
            <Marker
              coordinate={{
                longitude: SMUCOORDS.longitude,
                latitude: SMUCOORDS.latitude,
              }}
              pinColor='blue'
              title='SMU'
            />
            {PolylineCods && (
              <Polyline
                coordinates={PolylineCods.map(coord => ({
                  latitude: coord[0],
                  longitude: coord[1],
                }))}
                strokeWidth={2}
                strokeColor='blue'
              />
            )}
            {PolygonCods && (
              <Polygon
                coordinates={PolygonCods}
                strokeWidth={3}
                fillColor='rgba(67, 247, 154,0.3)'
              />
            )}
          </MapView>
        </>
      )}
    </View>
  );
};

export default DriverProvideRide;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "80%",
  },
});
