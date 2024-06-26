import React, { useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import Calendar from "../../components/Calendar";
import { useFocusEffect } from "@react-navigation/native";
import RideHistoryCard from "../../components/RideHistoryCard";
import { getPassengerRidesHistory } from "../../api/RideService";

function HistoryPassenger() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [ridesData, setRidesData] = useState([]);
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const fetchPassengerHistory = async () => {
        try {
          const rides = await getPassengerRidesHistory(user.uid);
          setRidesData(rides);
        } catch (error) {
          Alert.alert("Error fetching rides history ");
        }
      };
      fetchPassengerHistory();
    }, [user]) // Add 'user' to the dependency array
  );

  const today = new Date();
  const filteredRidesByDate = ridesData.filter(
    item => item.occurenceDate === selectedDate
  );
  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        onDateSelected={date => setSelectedDate(date.format("YYYY-MM-DD"))}
        maxDate={today}
        selectedDate={today}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredRidesByDate.length === 0 ? (
          <Text style={styles.noHistoryText}>No history available</Text>
        ) : (
          filteredRidesByDate.map(item => (
            <RideHistoryCard
              driverFname={item.Ride.driver.firstName}
              driverLname={item.Ride.driver.lastName}
              key={item.Ride.driver.id}
              from={item.Ride.from}
              to={item.Ride.to}
              time={item.Ride.startTime}
              driverId={item.Ride.driver.id}
              age={22}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default HistoryPassenger;
