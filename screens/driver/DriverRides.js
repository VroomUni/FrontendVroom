import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import DriverDate from "../../components/DriverDate";
import RideCard from "../../components/RideCard";
import RideCardDetails from "../../components/RideCardDetails";
import RideCardList from "../../components/RideCardList";

function DriverRides() {
  

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  
console.log("from driverRides", selectedDate)
  return (
    <View style={styles.container}>
      <DriverDate onDateSelected={(date) => setSelectedDate(date.format('YYYY-MM-DD'))} />
      <RideCardList selectedDate={selectedDate}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DriverRides;
