import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import DriverCalendar from "../../components/driver/DriverCalendar";
import RideCard from "../../components/driver/RideCard";
import RideCardDetails from "../../components/driver/RideCardDetails";
import RideCardList from "../../components/driver/RideCardList";

function DriverRides({navigation}) {
  

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  
console.log("from driverRides", selectedDate)
  return (
    <View style={styles.container}>
      <DriverCalendar onDateSelected={(date) => setSelectedDate(date.format('YYYY-MM-DD'))} />
      <RideCardList selectedDate={selectedDate} navigation={navigation}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DriverRides;