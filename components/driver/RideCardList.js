import React, { useCallback, useEffect, useState } from "react";
import RideCard from "./RideCard";
import { View, StyleSheet, Text, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useAuth } from "../../context/AuthContext";
import { fetchDriverActiveRides } from "../../api/RideService";
import { useFocusEffect } from "@react-navigation/native";
import { cancelRide } from "../../api/RideService";
import { filterCanceledRides } from "../../utils/RideHelpers";

function RideCardList({ selectedDate, navigation }) {
  const { user } = useAuth();
  const driverId = user.uid;
  const [isLoading, setIsLoading] = useState(true);
  const [rideData, setRideData] = useState([]);
  // console.log(rideData);
  // NEED TO TEST MORE
  
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await fetchDriverActiveRides(driverId);
          setRideData(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          Alert.alert("An error occured while fetching your rides");
        }
      };

      fetchData();
    }, [driverId]) // Add driverId as a dependency
  );

  const filteredData = rideData.filter(
    item => item.occurenceDate === selectedDate
  );

  const handleDelete = async canceledId => {
    const handleCancelRide = async allInseries => {
      try {
        await cancelRide(canceledId, allInseries);
        setRideData(filterCanceledRides(rideData, canceledId, allInseries));
      } catch (err) {
        Alert.alert("An error occured while trying to cancel a ride");
      }
    };
    //must add check based on whether ride is recurrent or not
    Alert.alert(
      "Cancel Ride",
      "This ride is repeating.\nWould you like to cancel this ride only ?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "All related rides",
          onPress: async () => await handleCancelRide(true),
        },
        {
          text: "Yes",
          onPress: async () => await handleCancelRide(false),
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
        <Text>LOADING...</Text>
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
