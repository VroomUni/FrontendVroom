import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Calendar from "../../components/Calendar";
import RideCardList from "../../components/driver/RideCardList";

function DriverRides({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleDateSelection = selectedDate => {
    if (
      new Date(selectedDate).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
    ) {
      Alert.alert("History", "Would you like to check rides history", [
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
  const currentDate = new Date();
  return (
    <View style={styles.container}>
      {/* if selected date is before today then ask to redirect to history screen */}
      <Calendar
        onDateSelected={handleDateSelection}
        selectedDate={currentDate}
        minDate={currentDate}
        maxDate={new Date().setDate(new Date().getDate() + 7)}
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
