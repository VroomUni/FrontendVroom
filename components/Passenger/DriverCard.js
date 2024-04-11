import React, { useState, useRef } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { PaperProvider, Button } from "react-native-paper";
import PreferenceItem from "./preferenceItem";
import RideInfo from "../RideInfo";

export default function DriverCard({
  data,
  passengerPreferences,
  navigation,
  passengerLocation,
}) {
  const renderStars = rating => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name='star'
          size={24}
          style={i <= rating ? styles.filledStar : styles.emptyStar}
        />
      );
    }
    return stars;
  };

  const { driver } = data?.Ride;
  const fullName = driver?.firstName + " " + driver?.lastName;
  const renderPreferenceItems = () => {
    return (
      Object.keys(driver.Preference)
        .map(attribute => {
          if (driver.Preference[attribute] === null) {
            return null;
          }
          return (
            <PreferenceItem
              key={attribute}
              attribute={attribute}
              value={driver?.Preference[attribute]}
              matched={isPreferenceAttrMatch(
                attribute,
                driver.Preference,
                passengerPreferences
              )}
            />
          );
        })
        //to get the matched prefs at the start
        .sort((a, b) => {
          // Extract the 'matched' prop from the JSX elements
          const matchedA = a?.props?.matched || false;
          const matchedB = b?.props?.matched || false;

          if (matchedA === matchedB) {
            return 0;
          }
          if (matchedA === true) {
            return -1;
          }
          return 1;
        })
    );
  };
  const isPreferenceAttrMatch = (attribute, driverPref, passengerPref) => {
    //if passenger pref on the given attr is null , then he doesnt care => match
    if (passengerPref[attribute] === null) {
      return true;
    }
    return driverPref[attribute] === passengerPreferences[attribute];
  };
  return (
    <PaperProvider>
      <View style={styles.card}>
        <>
          <View>
            <Image
              style={styles.image}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar1.png",
              }}
            />
            <View>
              <Text style={styles.name}>{fullName}</Text>
              {/* // to fix rating  */}
              <View style={styles.stars}>{renderStars(3)}</View>
            </View>
          </View>
          <View style={styles.preferences}>{renderPreferenceItems()}</View>
          <RideInfo
            from={data.Ride.from}
            to={data.Ride.to}
            startTime={data.Ride.startTime}
          />
        </>
        <View style={styles.footer}>
          <Button
            mode='contained'
            onPress={() => {
              navigation.navigate("Map", {
                passengerLocation: passengerLocation,
                routePolyLine: data.Ride.encodedPath,
                from: data.Ride.from,
                to: data.Ride.to,
              });
            }}
            style={styles.mapButton}
            contentStyle={{ flexDirection: "row-reverse" }}
            labelStyle={styles.buttonText}
            icon={"map-marker"}>
            Show Map
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: "20%",
    width: "95%",
    height: "70%",
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 40,
    marginLeft: 40,
  },
  name: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#333",
    marginBottom: 5,
  },
  stars: {
    flexDirection: "row",
    marginLeft: 30,
  },
  filledStar: {
    color: "#FFD700",
  },
  emptyStar: {
    color: "#CCCCCC",
  },
  preferences: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },

  preferenceText: {
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    borderTopColor: "#eeeeee",
    borderTopWidth: 1,
    paddingTop: 8,
  },
  mapButton: {
    backgroundColor: "#d9534f",
  },
  buttonText: {
    color: "#ffffff",
  },
  buttonIcon: {
    color: "#ffffff",
  },
});
