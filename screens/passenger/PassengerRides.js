import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import DriverCalendar from "../../components/driver/DriverCalendar";
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

function PassengerRides({navigation}) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  
  return (
    <View style={styles.container}>
      <DriverCalendar
        onDateSelected={date => {
          if (new Date(date).getDate() < new Date().getDate()) {
            Alert.alert("History","Would you like to check rides history",   [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Go to history",
                onPress: () => navigation.navigate("History"),
              },
            ]);
            return;
          }
          setSelectedDate(date.format("YYYY-MM-DD"));
        }}
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