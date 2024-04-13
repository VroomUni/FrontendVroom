import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import DriverCalendar from "../../components/driver/DriverCalendar";
import RideCardList from "../../components/driver/RideCardList";

function DriverRides({navigation}) {
  

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  
  console.log("from driverRides selected Date", selectedDate)
  return (
    <View style={styles.container}>
      {/* if selected date is before today then ask to redirect to history screen */}
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
      <RideCardList selectedDate={selectedDate} navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DriverRides;
