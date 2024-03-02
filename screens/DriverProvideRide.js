import { StyleSheet, Image, View, Alert } from "react-native";
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
import DriverRideFromTo from "../components/DriverRideFromTo";
import DriverRideLocationInput from "../components/DriverRideLocationInput";
import { Button } from "react-native-paper";
import DriverRideExtraOptions from "../components/DriverRideExtraOptions";
const DriverProvideRide = ({ navigation, route }) => {
  const [PolylineCods, setPolylineCods] = useState(null);
  const [PolygonCods, setPolygonCods] = useState(null);

  const [destinationOrOrigin, setDestinationOrOrigin] = useState(null);
  const [isToSmu, setIsToSmu] = useState(true);
  const [onLocationInputPage, setOnLocationInputPage] = useState(false);
  const [isCustomLocationMarker, setCustomLocationMarker] = useState(false);
  const [isOptionShown, setIsOptionShown] = useState(false);
  const apiKey = "AIzaSyAzrdoZnMVbD3CXIjmhFfTWbsiejAM-H5M";
  const SMUCOORDS = {
    latitude: 36.84598089012623,
    longitude: 10.268806957645351,
  };
  const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${destinationOrOrigin?.coords.latitude},${destinationOrOrigin?.coords.longitude}&destination=${SMUCOORDS.latitude},${SMUCOORDS.longitude}&key=${apiKey}`;
  const handleLocationInputPage = () => {
    setOnLocationInputPage(true);
    setIsOptionShown(false);
    setPolygonCods(null);
    setPolylineCods(null);
  };
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
          Alert.alert("we encountered a problem");
        });
  }, [destinationOrOrigin]);

  const initialRegion = {
    latitude: 36.7277622657912, // Latitude of Tunisia
    longitude: 10.203072895008471, // Longitude of Tunisia

    latitudeDelta: 1, // Zoom level
    longitudeDelta: 1, // Zoom level
  };
  const mapViewRef = useRef(null);
  const currentRegion = useRef(initialRegion);
  useEffect(() => {
    // Use this useEffect to update the map region when PolylineCods changes
    if (mapViewRef.current && PolygonCods) {
      mapViewRef.current.fitToCoordinates(PolygonCods, {
        edgePadding: {
          top: 20,
          bottom: 10,
          right: 10,
          left: 10,
        },
        animated: true,
      });
    }
    if (destinationOrOrigin && !onLocationInputPage) {
        setIsOptionShown(true);
    } else {
      setIsOptionShown(false);
    }
  }, [PolygonCods, destinationOrOrigin, PolylineCods]);

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      {onLocationInputPage ? (
        //Destination/origin places autocomplete page
        <DriverRideLocationInput
          isToSmu={isToSmu}
          setOnLocationInputPage={setOnLocationInputPage}
          setDestinationOrOrigin={setDestinationOrOrigin}
          setCustomLocationMarker={setCustomLocationMarker}
        />
      ) : (
        //Map + from to inputs
        <>
          <DriverRideFromTo
            isToSmu={isToSmu}
            setIsToSmu={setIsToSmu}
            setOnLocationInputPage={handleLocationInputPage}
            destinationOrOrigin={destinationOrOrigin}
          />
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
                pinColor={isToSmu?'red':'blue'}
              />
            )}
            <Marker
              // SMU blue marker
              coordinate={{
                longitude: SMUCOORDS.longitude,
                latitude: SMUCOORDS.latitude,
              }}
              pinColor={isToSmu?'blue':'red'}
              title='SMU'
            />
            {/* route line in blue */}
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
            {/* area around the route , green surface */}
            {PolygonCods && (
              <Polygon
                coordinates={PolygonCods}
                strokeWidth={3}
                fillColor='rgba(67, 247, 154,0.3)'
              />
            )}
          </MapView>
          {isCustomLocationMarker && (
            <>
              <View style={styles.markerFixed}>
                <Image
                  style={styles.marker}
                  source={require("../assets/marker.png")}
                />
              </View>
              <Button
                mode='contained-tonal'
                buttonColor='#5e69ee'
                icon={"pin"}
                style={styles.PlaceMarkerBtn}
                onPress={() => {
                  if (isCustomLocationMarker) {
                    setDestinationOrOrigin({
                      name: "Custom Location",
                      coords: {
                        latitude: currentRegion.current.latitude,
                        longitude: currentRegion.current.longitude,
                      },
                    });
                  }
                  setCustomLocationMarker(false);
                }}>
                Place here
              </Button>
            </>
          )}
        </>
      )}
      {isOptionShown && <DriverRideExtraOptions />}
    </View>
  );
};

export default DriverProvideRide;

const styles = StyleSheet.create({
  map: {
    // width: "100%",
    // height: "70%",
    flex:6
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
  PlaceMarkerBtn:{
    position: "absolute",
    top: 250,
    right: 10,
    width: 180,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  }
});
