import { StyleSheet, Image, View, Alert } from "react-native";
import React, { useRef, useEffect, useState } from "react";

// import { isPointInPolygon } from "geolib";
import DriverRideFromTo from "../components/driver/DriverRideFromTo";
import DriverRideLocationInput from "../components/driver/DriverRideLocationInput";
import { Button } from "react-native-paper";
import DriverRideExtraOptions from "../components/driver/DriverRideExtraOptions";
import {
  DriverContextProvider,
  useDriverContext,
} from "../components/context/DriverContext";
import Map from "../components/Map";
const DriverProvideRideScreen = () => {
  const [onLocationInputPage, setOnLocationInputPage] = useState(false);
  const [isCustomLocationMarker, setCustomLocationMarker] = useState(false);
  const [isOptionShown, setIsOptionShown] = useState(false);

  const { destinationOrOrigin, setDestinationOrOrigin, isToSmu, setIsToSmu } =
    useDriverContext();

  const handleLocationInputPage = () => {
    setOnLocationInputPage(true);
    setIsOptionShown(false);
  };

  useEffect(() => {
    if (destinationOrOrigin && !onLocationInputPage) {
      setIsOptionShown(true);
    } else {
      setIsOptionShown(false);
    }
  }, [destinationOrOrigin]);

  const currentRegion = useRef({
    latitude: 36.7277622657912, // Latitude of Tunisia
    longitude: 10.203072895008471, // Longitude of Tunisia
    latitudeDelta: 1, // Zoom level
    longitudeDelta: 1, // Zoom level
  });

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      {onLocationInputPage ? (
        //Destination/origin places autocomplete page
        <DriverRideLocationInput
          isToSmu={isToSmu}
          setOnLocationInputPage={setOnLocationInputPage}
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

          <Map currentRegion={currentRegion} />

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
const DriverProvideRide = () => (
  <DriverContextProvider>
    <DriverProvideRideScreen />
  </DriverContextProvider>
);

const styles = StyleSheet.create({
  markerFixed: {
    position: "absolute",
    top: "65%", // Center vertically
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

export default DriverProvideRide;
