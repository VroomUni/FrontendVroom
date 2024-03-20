import { StyleSheet, Image, View, Alert } from "react-native";
import React, { useRef, useEffect, useState } from "react";

// import { isPointInPolygon } from "geolib";
import DriverRideFromTo from "../components/driver/DriverRideFromTo";
import RideLocationInput from "../components/driver/DriverRideLocationInput";
import { Button, Icon, Portal, Snackbar } from "react-native-paper";
import DriverRideExtraOptions from "../components/driver/DriverRideExtraOptions";
import {
  UserRideContextProvider,
  useRideContext,
} from "../context/UserRideContext";
import Map from "../components/Map";
import axios from "axios";
import rideApiService from "../api/RideService";
import { fromToObjBuilder } from "../utils/RideHelpers";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
const RideInfo = ({ navigation }) => {
  const {
    destinationOrOrigin,
    setDestinationOrOrigin,
    isToSmu,
    polylineCods,
    polygonCods,
    btnGrpDateValue: selectedDateType,
    spotsCount,
    customSelectedTime,
    recurrentDays,
    customSelectedDate,
    setPolygonCods,
    setPolylineCods,
  } = useRideContext();
  const { user, isPassenger } = useAuth();
  const [isOptionShown, setOptionShown] = useState(false);
  const [confirmBtnVisible, setConfirmBtnVisible] = useState(false);
  const [rideSuccessCreation, setRideSucessCreation] = useState(false);
  const [postRideBtnLoading, setPostRideBtnLoading] = useState(false);
  const [onLocationInputPage, setOnLocationInputPage] = useState(false);
  const [isCustomLocationMarker, setCustomLocationMarker] = useState(false);

  useEffect(() => {
    if (destinationOrOrigin) {
      setOptionShown(true);
    } else {
      setOptionShown(false);
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
      ? setConfirmBtnVisible(true)
      : setConfirmBtnVisible(false);
  }, [customSelectedTime]);

  const goToLocationInputPage = () => {
    setOnLocationInputPage(true);
    setOptionShown(false);
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
      driverFirebaseId: user.uid,
    };
    const resp = await rideApiService.postRide(ridePayload);
  };
  return (
    <View style={{ flex: 1, paddingTop: 50, backgroundColor: "#E2EAF4" }}>
      {onLocationInputPage ? (
        //Destination/origin places autocomplete page
        <RideLocationInput
          isToSmu={isToSmu}
          setOnLocationInputPage={setOnLocationInputPage}
          setCustomLocationMarker={setCustomLocationMarker}
        />
      ) : (
        //Map + from to inputs
        <>
          <DriverRideFromTo setOnLocationInputPage={goToLocationInputPage} />

          <Map
            currentRegion={currentRegion}
            showPolygon={isPassenger ? false : true}
            destinationOrOrigin={destinationOrOrigin}
            setPolygonCods={setPolygonCods}
            setPolylineCods={setPolylineCods}
            polygonCods={polygonCods}
            polylineCods={polylineCods}
            isToSmu={isToSmu}
          />

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
          {confirmBtnVisible && isOptionShown && (
            <Button
              mode='contained-tonal'
              buttonColor='#20c997'
              icon={
                !isPassenger
                  ? "checkbox-marked-circle-plus-outline"
                  : "card-search-outline"
              }
              loading={postRideBtnLoading}
              style={styles.PostRideBtn}
              onPress={
                !isPassenger
                  ? () => {
                      setPostRideBtnLoading(true);
                      createRide()
                        .then(() => {
                          setRideSucessCreation(true);
                          setPostRideBtnLoading(false);
                        })
                        .catch(err => {
                          console.error(err);
                          Alert.alert("There was a problem creating your ride");
                          setPostRideBtnLoading(false);
                        });
                    }
                  : () => {
                      navigation.navigate("Rides");
                    }
              }>
              {!isPassenger ? "Post Ride" : "Search"}
            </Button>
          )}
          {isOptionShown && <DriverRideExtraOptions />}
          {/* todo fix iocn  */}
          <Snackbar
            visible={rideSuccessCreation}
            onDismiss={() => {
              setRideSucessCreation(false);
            }}
            icon={"check"}
            duration={3000}
            style={{ backgroundColor: "green" }} // Set the background color to green
          >
            Your ride was created successfully
          </Snackbar>
        </>
      )}
    </View>
  );
};

const RideInfoInput = ({ navigation }) => (
  <UserRideContextProvider>
    <SafeAreaProvider>
      <RideInfo navigation={navigation} />
    </SafeAreaProvider>
  </UserRideContextProvider>
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

export default RideInfoInput;
