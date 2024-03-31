import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Button, TextInput } from "react-native-paper";
import * as Location from "expo-location";
import { useRideContext } from "../../context/UserRideContext";
import { GOOGLE_MAPS_KEY } from "@env";

const DriverRideLocationInput = ({
  setOnLocationInputPage,
  setCustomLocationMarker,
}) => {
  const { isToSmu, setDestinationOrOrigin } = useRideContext();

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#F4F4FB" }}>
        <GooglePlacesAutocomplete
          nearbyPlacesAPI='GoogleReverseGeocoding'
          placeholder={isToSmu ? "Enter start location" : "Enter destination"}
          listViewDisplayed='auto'
          debounce={400}
          minLength={2}
          enablePoweredByContainer={false}
          autoFocus={true}
          styles={autoCompleteStyle}
          fetchDetails={true}
          isRowScrollable={false}
          textInputProps={{
            InputComp: TextInput,
          }}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: "en",
            components: "country:tn",
          }}
          onPress={(data, details) => {
            setDestinationOrOrigin({
              coords: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              },
              name: details.name,
            });
            setOnLocationInputPage(false);
          }}
          predefinedPlaces={[
            {
              description: "Home",
              geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
            },
          ]}
        />
        <Button
          mode='outlined'
          buttonColor='#E2EAF4'
          textColor='#162447'
          icon={"map-marker-radius"}
          style={styles.buttons}
          onPress={async () => {
            try {
              let { status } =
                await Location.requestForegroundPermissionsAsync();
              if (status !== "granted") {
                throw new Error();
              }

              let location = await Location.getCurrentPositionAsync({});
              setDestinationOrOrigin({
                coords: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                },
                name: "Current location",
              });
              setOnLocationInputPage(false);
            } catch (error) {
              console.log(error);
              Alert.alert("Please enable location permission");
            }
          }}>
          Use current location
        </Button>

        <Button
          mode='outlined'
          buttonColor='#E2EAF4'
          textColor='#162447'
          icon={"pin"}
          style={styles.buttons}
          onPress={() => {
            setOnLocationInputPage(false);
            setDestinationOrOrigin(null);
            setCustomLocationMarker(true);
          }}>
          Choose on map
        </Button>
      </View>
    </>
  );
};

export default DriverRideLocationInput;

const styles = StyleSheet.create({
  buttons: {
    width: 300,
    borderRadius: 10,
    margin: "auto",
    alignSelf: "center",
    marginTop: 15,
  },
});
const autoCompleteStyle = {
  textInput: {
    height: 50,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    marginHorizontal: 15,
  },
  container: {
    paddingTop: 20,
    flex: 0,
  },

  listView: {
    paddingHorizontal: 15,
  },
};
