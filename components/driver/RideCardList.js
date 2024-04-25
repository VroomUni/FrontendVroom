import React, { useEffect, useState } from "react";
import RideCard from "./RideCard";
import { View, StyleSheet, Text, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useAuth } from "../../context/AuthContext";
import { fetchDriverActiveRides } from "../../api/RideService";

function RideCardList({ selectedDate, navigation }) {
  const { user } = useAuth();
  const driverId = user.uid;
  const [isLoading, setIsLoading] = useState(true);
  const [rideData, setRideData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDriverActiveRides(driverId);
        setRideData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("An error occured while fetchind your rides");
      }
    };

    fetchData();
  }, []);
  console.log("selected date", selectedDate);
  const filteredData = rideData.filter(
    item => item.occurenceDate === selectedDate
  );
  //cancel all rides in the series: for automatically scheduled rides => no more auto creation of those rides + cancel all existing  ,
  const handleDelete = id => {
    Alert.alert(
      "Cancel Rides",
      "Would you like to cancel all rides in this series?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Only this ride",
          onPress: () => setRideData(rideData.filter(item => item.id !== id)),
        },
        {
          text: "Yes",
          onPress: () => setRideData(rideData.filter(item => item.id !== id)),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <RideCard
      id={item.id}
      from={item.Ride.from}
      to={item.Ride.to}
      time={item.Ride.startTime.split(":").slice(0, 2).join(":")}
      requests={item.passenger}
      routePolyline={item.Ride.encodedPath}
      onDelete={handleDelete}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>  LOADING...</Text>
      ) : filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()} // Ensure item.id is converted to a string
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text style={styles.noRidesText}>
          No scheduled rides for this date.
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  noRidesText: {
    color: "#162447",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default RideCardList;
