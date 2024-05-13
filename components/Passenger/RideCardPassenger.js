// RideCardPassenger.js
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button } from "react-native-paper";

function RideCardPassenger({
  id,
  driverName,
  carModel,
  carColor,
  phoneNumber,
  status,
}) {
  const getStatusColors = () => {
    switch (status) {
      case 0:
        return { backgroundColor: "#D3D3D3", borderColor: "#A9A9A9" }; // Pending
      case 1:
        return { backgroundColor: "#98FB98", borderColor: "#3CB371" }; // Accepted
      case -1:
        return { backgroundColor: "#FFB6C1", borderColor: "#DC143C" }; // Declined
    }
  };

  const renderStatus = () => {
    if (status === 0) {
      return "Pending";
    }
    if (status === 1) {
      return "Accepted";
    }
    if (status === -1) {
      return "Declined";
    }
  };

  const statusColor = getStatusColors();

  const carModels = [
    "Toyota Yaris",
    "Volkswagen Polo",
    "Ford Focus",
    "Renault Clio",
    "BMW 112i",
  ];
  const carColors = ["Red", "Blue", "Green", "Black", "White"];

  const getRandomItem = array => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  const randomCarModel = getRandomItem(carModels);
  const randomCarColor = getRandomItem(carColors);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.driverName}>Driver: {driverName}</Text>
          <Text style={styles.text}>Car Model: {randomCarModel}</Text>
          <Text style={styles.text}>Car Color: {randomCarColor}</Text>
          <Text style={styles.text}>Phone Number: {phoneNumber}</Text>
          <Button
            mode='contained'
            style={[
              styles.button,
              {
                backgroundColor: statusColor.backgroundColor,
                borderColor: statusColor.borderColor,
                borderWidth: 2, // This adds a border to the button
              },
            ]}
            labelStyle={{ color: "black", fontWeight: "bold" }}>
            {renderStatus()}
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30, // This creates space between the cards
  },
  card: {
    width: "90%", // This makes the card wider. Adjust as needed.
    marginHorizontal: "5%",
    height: 120,
  },
  text: {
    fontSize: 16, // This makes the text a bit bigger
    lineHeight: 24, // This adds more space between the lines. Adjust as needed.
    paddingLeft: 10, // This adds some space to the left of each line. Adjust as needed.
  },
  driverName: {
    fontSize: 16,
    fontWeight: "700", // This makes the driver's name a bit bolder. Adjust as needed.
    lineHeight: 24, // This adds more space between the lines. Adjust as needed.
    paddingLeft: 10, // This adds some space to the left of each line. Adjust as needed.
    color: "#000080", // This makes the driver's name dark blue.
  },
  button: {
    position: "absolute",
    right: 0,
    marginTop: 10,
    marginRight: 10,
  },
});

export default RideCardPassenger;
