import React, { useState, useRef } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Map from "./Map";
import { Modal, Portal, PaperProvider, Button } from "react-native-paper";
import PreferenceItem from "./preferenceItem";

export default function DriverCard({ driver , passengerPreferences}) {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name="star"
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
        <View>
          <Image
            style={styles.image}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar1.png",
            }}
          />
          <View>
            <Text style={styles.name}>{`${driver.firstName} ${driver.lastName}`}</Text>
            <View style={styles.stars}>{renderStars(driver.rating)}</View>
          </View>
        </View>
        <View style={styles.preferences}>
          <PreferenceItem attribute="Smoking" value={driver.smoking} matched= {driver.smoking === passengerPreferences.smoking}/>
          <PreferenceItem attribute="Talkative" value={driver.Talkative} matched={driver.Talkative === passengerPreferences.Talkative} />
          <PreferenceItem attribute="Eating" value={driver.eating} matched={driver.eating=== passengerPreferences.eating}/>
          <PreferenceItem attribute="Music Genre" value={driver.musicGenre} matched={driver.musicGenre=== passengerPreferences.musicGenre} />
        </View>
        <View style={styles.departureInfo}>
          <View style={styles.infoRow}>
            <FontAwesome
              name="clock-o"
              size={20}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.time}>{driver.time}</Text>
          </View>
          <View style={styles.departureInfo}>
            <View style={styles.infoRow}>
              <FontAwesome
                name="circle"
                size={16}
                color="#00669B"
                style={styles.icon}
              />
              <Text style={styles.addressText}>{driver.departure}</Text>
            </View>
            <Text style={styles.dots}>
              <FontAwesome name="ellipsis-v" size={16} color="#333" />
            </Text>
            <View style={styles.infoRow}>
              <FontAwesome
                name="map-marker"
                size={16}
                color="#00669B"
                style={styles.icon}
              />
              <Text style={styles.addressText}>{driver.destination}</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={showModal}
            style={styles.mapButton}
            contentStyle={{ flexDirection: "row-reverse" }}
            labelStyle={styles.buttonText}
            icon="map-marker"
          >
            Show Map
          </Button>
        </View>
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "white",
              height: "50%",
              justifyContent: "space-between",
              borderRadius: 15,
              padding: 20,
            }}
          >
            <Map />
          </View>
        </Modal>
      </Portal>
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
