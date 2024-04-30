import { StyleSheet, Text, View, Dimensions ,TouchableOpacity } from "react-native";
import React from "react";
import RideInfo from "./RideInfo";

const windowWidth = Dimensions.get("window").width;

const RideHistoryCard = ({
  photo,
  age,
  from,
  to,
  time,
  driverId,
  driverFname,
  driverLname,
}) => {
  const handleRatingPress = userId => {
    console.log("Navigate to rating screen for user:", userId);
  };

  const handleReportPress = userId => {
    console.log("Navigate to report screen for user:", userId);
  };
  const driverFullName = driverFname + " " + driverLname;
  return (
    <View  style={styles.cardView}>
      {/* <Image source={{ uri: photo }} style={styles.userPhoto} /> */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{driverFullName} </Text>
        <Text style={styles.userAge}>{age} years old</Text>
        <RideInfo  from={from}to={to} startTime={time}/>
        {/* <Text style={styles.userLocation}>From: {from}</Text>
        <Text style={styles.userLocation}>To: {to}</Text>
        <Text style={styles.userTime}>Time: {time}</Text> */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => handleRatingPress(driverId)}
            style={styles.button}>
            <Text style={styles.buttonText}>Rate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleReportPress(driverId)}
            style={[styles.button, styles.reportButton]}>
            <Text style={styles.buttonText}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RideHistoryCard;

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: "#fff",
    flexDirection: "row",
    margin: 6,
    padding: 16,
    width: windowWidth / 1.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userAge: {
    fontSize: 16,
    color: "#777",
  },
  userLocation: {
    fontSize: 14,
    color: "#333",
    fontWeight:"bold"
  },
  userTime: {
    fontSize: 14,
    color: "#05375a",
    fontWeight:'bold'
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#DA554E",
    marginRight: 10,
  },
  reportButton: {
    backgroundColor: "#DA554E",
  },
  buttonText: {
    color: "white",
  },
  noHistoryText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
});
