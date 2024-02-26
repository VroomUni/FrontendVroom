import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
const DriverProvideRide = ({ navigation, route }) => {
  const [PolylineCods, setPolylineCods] = useState(null);
  const [PolygonCods, setPolygonCods] = useState();
  const apiKey = "AIzaSyAzrdoZnMVbD3CXIjmhFfTWbsiejAM-H5M";
  const origin = "ben arous tunisia";
  const destination = "sfax tunisia";

  const apiUrl = `https://maps.googleapis.com/maps/api/directinnons/json?origin=${origin}&destination=${destination}&key=${apiKey}`;
  useEffect(() => {
    axios
      .get(apiUrl)
      .then(response => {
        const overviewPath = response.data.routes[0].overview_polyline.points;

        const decodedCoordinates = decode(overviewPath);
        const geoJsonFeature = {
          type: "LineString",
          coordinates: decodedCoordinates.map(coord => [coord[0], coord[1]]),
        };

        const geoReader = new GeoJSONReader();
        const geoWriter = new GeoJSONWriter();
        const geometry = geoReader.read(geoJsonFeature);

        // Use BufferOp to buffer the geometry
        const bufferOp = new BufferOp(geometry);
        const distance = 10 / 500.12;
        const bufferedGeometry = bufferOp.getResultGeometry(distance);
        const resultPolyCords = geoWriter.write(bufferedGeometry);

        setPolygonCods(
          resultPolyCords.coordinates[0].map(elt => ({
            latitude: elt[0],
            longitude: elt[1],
          }))
        );
        setPolylineCods(decodedCoordinates);
      })
      .catch(error => {
        // Handle errors
        console.error("Error ", error);
      });
  }, []);
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         setErrorMsg("Permission to access location was denied");
  //         return;
  //       }

  //       let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
  //       setLocation(location);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  // console.log(text);

  const [isToSmu, setIsToSmu] = useState(true);
  const [onLocationInputPage, setOnLocationInput] = useState(false);
  const [destinationOrOrigin, setDestinationOrOrigin] = useState(null);

  const initialRegion = {
    latitude: 35.8999, // Latitude of Tunisia
    longitude: 9.5375, // Longitude of Tunisia

    latitudeDelta: 2, // Zoom level. Adjust as needed
    longitudeDelta: 2, // Zoom level. Adjust as needed
  };

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
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={initialRegion}
            showsUserLocation={true}>
            {/* {location && (
            <Marker
              coordinate={{
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              }}
            />
          )} */}
            {PolylineCods && (
              <Polyline
                coordinates={PolylineCods?.map(coord => ({
                  latitude: coord[0],
                  longitude: coord[1],
                }))}
                strokeWidth={3}
                strokeColor='blue'
              />
            )}
            {PolygonCods && (
              <Polygon
                coordinates={PolygonCods}
                strokeWidth={4}
                fillColor='green'
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
