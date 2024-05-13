import { View, StyleSheet, Alert } from "react-native";
import React, { useState, useCallback } from "react";
import Calendar from "../../components/Calendar";
import RideCardListPassenger from "../../components/Passenger/RideCardListPassenger";
import { useAuth } from "../../context/AuthContext";
import { getPassengerRequestedRides } from "../../api/RideService";
import { useFocusEffect } from "@react-navigation/native";

function PassengerRides({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [ridesData, setRidesData] = useState([]);
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const fetchPassengerRidesHistory = async () => {
        try {
          const rides = await getPassengerRequestedRides(user.uid);
          setRidesData(rides);
        } catch (error) {
          Alert.alert("Error fetching scheduled rides ");
        }
      };
      fetchPassengerRidesHistory();
    }, [user]) // Add 'user' to the dependency array
  );
  const handleDateSelection = selectedDate => {
    if (
      new Date(selectedDate).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
    ) {
      Alert.alert("History", "Would you like to check your rides history", [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Go to history",
          onPress: () => navigation.navigate("History"),
        },
      ]);
      return;
    }
    setSelectedDate(selectedDate.format("YYYY-MM-DD"));
  };
  const today = new Date();
  const rides = ridesData.filter(item => item.occurenceDate === selectedDate);
  console.log(JSON.stringify(rides));

  return (
    <View style={styles.container}>
      <Calendar
        onDateSelected={handleDateSelection}
        selectedDate={today}
        minDate={today}
        maxDate={new Date().setDate(new Date().getDate() + 7)}
      />
      <RideCardListPassenger rides={rides} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PassengerRides;
