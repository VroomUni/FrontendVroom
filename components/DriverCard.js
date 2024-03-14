import React, { useState, useRef } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Map from "./Map";
import { PaperProvider, Button } from "react-native-paper";
import PreferenceItem from "./preferenceItem";
import { UserRideContextProvider } from "../context/UserRideContext";

export default function DriverCard({ driver }) {
  const [isMapShown, setShowMap] = useState(false);

  const toggleMap = () => setShowMap(!isMapShown);

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

  return (
    <PaperProvider>
      <View style={styles.card}>
        {!isMapShown ? (
          <>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar1.png",
                }}
              />
              <View>
                <Text
                  style={
                    styles.name
                  }>{`${driver.firstName} ${driver.lastName}`}</Text>
                <View style={styles.stars}>{renderStars(driver.rating)}</View>
              </View>
            </View>
            <View style={styles.preferences}>
              <PreferenceItem attribute='Smoking' value={driver.smoking} />
              <PreferenceItem attribute='Talkative' value={driver.Talkative} />
              <PreferenceItem attribute='Eating' value={driver.eating} />
              <PreferenceItem
                attribute='Music Genre'
                value={driver.musicGenre}
              />
            </View>
            <View style={styles.departureInfo}>
              <View style={styles.infoRow}>
                <FontAwesome
                  name='clock-o'
                  size={20}
                  color='#333'
                  style={styles.icon}
                />
                <Text style={styles.time}>{driver.time}</Text>
              </View>
              <View style={styles.departureInfo}>
                <View style={styles.infoRow}>
                  <FontAwesome
                    name='circle'
                    size={16}
                    color='#00669B'
                    style={styles.icon}
                  />
                  <Text style={styles.addressText}>{driver.departure}</Text>
                </View>
                <Text style={styles.dots}>
                  <FontAwesome name='ellipsis-v' size={16} color='#333' />
                </Text>
                <View style={styles.infoRow}>
                  <FontAwesome
                    name='map-marker'
                    size={16}
                    color='#00669B'
                    style={styles.icon}
                  />
                  <Text style={styles.addressText}>{driver.destination}</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          //take map to a new screen and fix the props inside of the map 
          <View style={{ height: "100%", width: "100%", borderRadius: 15 }}>
            <Map
              currentRegion={{
                latitude: 36.7277622657912, // Latitude of Tunisia
                longitude: 10.203072895008471, // Longitude of Tunisia
                latitudeDelta: 1, // Zoom level
                longitudeDelta: 1, // Zoom level
              }}
              polylineCods={[
                [36.82468, 10.20158],
                [36.8249, 10.20191],
                [36.82509, 10.20214],
                [36.82551, 10.20249],
                [36.82579, 10.20267],
                [36.82649, 10.20305],
                [36.82698, 10.20336],
                [36.82722, 10.20356],
                [36.82739, 10.20372],
                [36.82754, 10.20391],
                [36.82772, 10.20416],
                [36.82787, 10.20441],
                [36.82809, 10.20491],
                [36.82885, 10.20659],
                [36.82931, 10.20764],
                [36.83035, 10.21006],
                [36.83094, 10.21135],
                [36.83141, 10.21249],
                [36.83218, 10.21418],
                [36.83317, 10.21641],
                [36.83337, 10.21695],
                [36.83367, 10.21792],
                [36.83503, 10.22263],
                [36.83653, 10.22786],
                [36.83751, 10.2313],
                [36.83782, 10.23229],
                [36.83851, 10.23457],
                [36.83924, 10.23713],
                [36.83964, 10.23853],
                [36.84045, 10.24128],
                [36.84091, 10.24272],
                [36.84148, 10.24434],
                [36.84252, 10.24718],
                [36.84504, 10.2542],
                [36.84534, 10.25503],
                [36.84613, 10.25715],
                [36.84613, 10.25729],
                [36.84638, 10.25795],
                [36.84639, 10.25805],
                [36.84652, 10.25848],
                [36.84654, 10.2587],
                [36.84652, 10.2589],
                [36.84647, 10.25905],
                [36.84643, 10.25911],
                [36.84638, 10.25916],
                [36.84629, 10.25918],
                [36.84627, 10.25915],
                [36.8462, 10.2591],
                [36.84609, 10.25909],
                [36.846, 10.25912],
                [36.84594, 10.25918],
                [36.84589, 10.25929],
                [36.84588, 10.25941],
                [36.84587, 10.25952],
                [36.84577, 10.25973],
                [36.84384, 10.26318],
                [36.84417, 10.26348],
                [36.84423, 10.2636],
                [36.84439, 10.26469],
                [36.84458, 10.26604],
                [36.84471, 10.2669],
                [36.84485, 10.26702],
                [36.84553, 10.26758],
                [36.84606, 10.26801],
                [36.84596, 10.26821],
                [36.84594, 10.26835],
                [36.84598, 10.26872],
                [36.84599, 10.2688],
              ]}
            />
          </View>
        )}
        <View style={styles.footer}>
          <Button
            mode='contained'
            onPress={toggleMap}
            style={[
              styles.mapButton,
              isMapShown && {
                position: "relative",
                bottom: 70,
                marginRight: 10,
              },
            ]}
            contentStyle={{ flexDirection: "row-reverse" }}
            labelStyle={styles.buttonText}
            icon={!isMapShown ? "map-marker" : "arrow-left"}>
            {!isMapShown && "Show Map"}
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: "30%",
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
    marginVertical: 20,
  },

  preferenceText: {
    color: "#333",
  },

  departureInfo: {
    width: "100%",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  icon: {
    marginRight: 8,
    color: "#162447",
  },

  time: {
    color: "#333",
    fontSize: 16,
  },

  dots: {
    fontSize: 16,
    color: "#162447",
    paddingVertical: 2,
    paddingHorizontal: 3,
  },

  addressText: {
    fontSize: 16,
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
