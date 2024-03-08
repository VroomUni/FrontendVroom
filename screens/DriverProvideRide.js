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
import axios from "axios";
import rideApiService from "../services/RideService";
import { fromToObjBuilder } from "../utils/RideHelpers";
const DriverProvideRideScreen = () => {
  const [onLocationInputPage, setOnLocationInputPage] = useState(false);
  const [isCustomLocationMarker, setCustomLocationMarker] = useState(false);
  const [isOptionShown, setIsOptionShown] = useState(false);
  const [isPostRideBtnVisible, setPostRideBtnVisible] = useState(false);
  const {
    destinationOrOrigin,
    setDestinationOrOrigin,
    isToSmu,
    setIsToSmu,
    polylineCods,
    polygonCods,
    btnGrpDateValue: selectedDateType,
    spotsCount,
    customSelectedTime,
    recurrentDays,
    customSelectedDate,
  } = useDriverContext();

  useEffect(() => {
    if (destinationOrOrigin) {
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

  useEffect(() => {
    customSelectedTime
      ? setPostRideBtnVisible(true)
      : setPostRideBtnVisible(false);
  }, [customSelectedTime]);

  const goToLocationInputPage = () => {
    setOnLocationInputPage(true);
    setIsOptionShown(false);
  };

  const reverseGeoCodeCustomLocation = async customLocation => {
    const apiKey = "AIzaSyAzrdoZnMVbD3CXIjmhFfTWbsiejAM-H5M";
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${customLocation.latitude},${customLocation.longitude}&result_type=political&region=tn&key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);

      return response.data.status === "OK"
        ? response.data.results[0].formatted_address
        : "Custom Location";
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
      Alert.alert("error with determining custom location name ");
    }
  };

  const createRide = async () => {
    const ridePayload = {
      //helper fct to determine from and to since its dynamic
      ...fromToObjBuilder(isToSmu, destinationOrOrigin.name),
      spots: spotsCount,
      encodedPath: polylineCods,
      encodedArea: polygonCods,
      startTime: customSelectedTime,
      initialDate: { customSelectedDate, selectedDateType },
      recurrence: recurrentDays,
    };
    const resp=await rideApiService.postRide(ridePayload);
  };
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
            setOnLocationInputPage={goToLocationInputPage}
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
                  const customLocation = {
                    latitude: currentRegion.current.latitude,
                    longitude: currentRegion.current.longitude,
                  };
                  reverseGeoCodeCustomLocation(customLocation).then(
                    customLocationAdressName => {
                      setDestinationOrOrigin({
                        name: customLocationAdressName,
                        coords: { ...customLocation },
                      });

                      setCustomLocationMarker(false);
                    }
                  );
                }}>
                Place here
              </Button>
            </>
          )}
          {/* post ride btn  */}
          {isPostRideBtnVisible && isOptionShown && (
            <Button
              mode='contained-tonal'
              buttonColor='#20c997'
              icon={"plus"}
              style={styles.PostRideBtn}
              onPress={createRide}>
              Post Ride
            </Button>
          )}
          {isOptionShown && <DriverRideExtraOptions />}
        </>
      )}
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
  PostRideBtn: {
    position: "absolute",
    top: 195,
    right: 10,
    width: 160,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
});

export default DriverProvideRide;
