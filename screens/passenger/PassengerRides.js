import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Calendar from "../../components/Calendar";
import RideCardListPassenger from "../../components/Passenger/RideCardListPassenger";

// Mock data
const rides = [
  {
    id: '1',
    driverName: 'John Doe',
    carModel: 'Toyota Camry',
    driverPhone: '123-456-7890',
    status: 'Pending',
  },
  {
    id: '2',
    driverName: 'Jane Smith',
    carModel: 'Honda Accord',
    driverPhone: '234-567-8901',
    status: 'Accepted',
  },
  {
    id: '3',
    driverName: 'Bob Johnson',
    carModel: 'Ford Focus',
    driverPhone: '345-678-9012',
    status: 'Declined',
  },
  // Add the rest of your ride objects here
];

function PassengerRides({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
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
