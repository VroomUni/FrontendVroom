import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Button, TextInput } from "react-native-paper";

const DriverRideLocationInput = () => {
  const autoComplete = {
    textInput: {
      height: 50,
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: 18,
      flex: 1,
      marginHorizontal: 15,
    },
    container: {
      paddingTop: 20,
      flex:0
    },

    listView: {
      paddingHorizontal: 15,
    },
  };

  return (
    <>
      <View
       style={{ flex: 1 }}
      >
        <GooglePlacesAutocomplete
          nearbyPlacesAPI='GooglePlacesSearch'
          placeholder='From To'
          listViewDisplayed='auto'
          debounce={400}
          minLength={2}
          enablePoweredByContainer={false}
          autoFocus={true}
          styles={autoComplete}
          isRowScrollable={false}
          textInputProps={{
            InputComp: TextInput,
          }}
          query={{
            key: "AIzaSyAzrdoZnMVbD3CXIjmhFfTWbsiejAM-H5M",
            language: "en",
          }}
          //   onPress={(data, details = null) => {
          //     dispatchOrigin({
          //       type: "ADD_ORIGIN",
          //       payload: {
          //         latitude: details.geometry.location.lat,
          //         longitude: details.geometry.location.lng,
          //         address: details.formatted_address,
          //         name: details.name,
          //       },
          //     });

          //     setDestination(true);
          //   }}
          predefinedPlaces={[
            {
              description: "Home",
              geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
            },
          ]}
        />
           <Button
        mode='outlined'
        buttonColor='#39AFEA'
        textColor='white'
        icon={"map-marker-radius"}
        style={{
          width: 300,
          borderRadius: 10,
          margin: "auto",
          alignSelf: "center",
          marginTop:20
          
        }}>
        {" "}
        Use current location
      </Button>
      </View>
   
    </>
  );
};

export default DriverRideLocationInput;

const styles = StyleSheet.create({});
