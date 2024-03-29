import React, { useState } from "react";
import MapView from "react-native-maps";
import PassengerRequestCard from "./PassengerRequestCard";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import SwipeContent from "./SwipeContent";

function RideCardDetails() {
  const [rideRequests, setRideRequests] = useState([
    {
      id: "1",
      FName: "Emma",
      LName: "Smith",
      location: "Central Park",
      time: "10:00 AM",
      requests: "2",
      rating: 4,
    },
    {
      id: "2",
      FName: "Liam",
      LName: "Johnson",
      location: "Madison Square",
      time: "11:00 AM",
      requests: "1",
      rating: 3,
    },
    {
      id: "3",
      FName: "Olivia",
      LName: "Williams",
      location: "Union Square",
      time: "12:00 PM",
      requests: "3",
      rating: 5,
    },
    {
      id: "4",
      FName: "Noah",
      LName: "Brown",
      location: "Times Square",
      time: "01:00 PM",
      requests: "2",
      rating: 4,
    },
    {
      id: "5",
      FName: "Ava",
      LName: "Jones",
      location: "Columbus Circle",
      time: "02:00 PM",
      requests: "1",
      rating: 2,
    },
  ]);
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (rowMap, rowKey) => {
    Alert.alert(
      "Decline Request",
      "Are you sure you want to decline this request ?",
      [
        {
          text: "No",
          onPress: () => {
            console.log("Cancel Pressed");
            closeRow(rowMap, rowKey);
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            setRideRequests(rideRequests.filter((item) => item.id !== rowKey)),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <PassengerRequestCard
      key={item.id}
      id={item.id}
      FName={item.FName}
      LName={item.LName}
      location={item.location}
      time={item.time}
      rating={item.rating}
    />
  );

  const renderHiddenItem = (data, rowMap) => (
    <SwipeContent
      onClose={() => closeRow(rowMap, data.item.id)}
      rowMap={rowMap}
      onDelete={() => deleteRow(rowMap, data.item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <SwipeListView
        data={rideRequests}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-150}
        leftOpenValue={75}
        keyExtractor={(item) => item.id}
        style={styles.rideList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "50%",
  },
  rideList: {
    flex: 1,
  },
});

export default RideCardDetails;
