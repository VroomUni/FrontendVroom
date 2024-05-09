import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Calendar from "../../components/Calendar";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { getUserRideHistory } from "../../api/RideService";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import RideInfo from "../../components/RideInfo";
import { ScrollView } from "react-native-gesture-handler";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function HistoryDriver() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [ridesData, setRidesData] = useState([]);
  const navigation = useNavigation();

  const { user, isPassenger } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const fetchDriverRidesHistory = async () => {
        try {
          const rides = await getUserRideHistory(user.uid, isPassenger);
          setRidesData(rides);
          console.log(JSON.stringify(rides[0]));
        } catch (error) {
          Alert.alert("Error fetching rides history ");
        }
      };
      fetchDriverRidesHistory();
    }, [user])
  );

  const handleRateClick = passengers => {
    navigation.navigate("Passengers", { passengers });
  };

  const onDateSelected = date => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  const filteredRidesByDate = ridesData.filter(
    item => item.occurenceDate === selectedDate
  );

  const today = new Date();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          onDateSelected={onDateSelected}
          maxDate={today}
          selectedDate={today}
        />
      </View>
      <View style={styles.cardsContainer}>
        {filteredRidesByDate.length === 0 ? (
          <Text style={styles.noHistoryText}>No history available</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {filteredRidesByDate.map(item => (
              <View key={item.id} style={styles.cardView}>
                <View style={styles.userInfo}>
                  <RideInfo
                    from={item.Ride.from}
                    to={item.Ride.to}
                    startTime={item.Ride.startTime}
                  />
                  <View style={styles.passengersContainer}>
                    {item.passenger.map((passenger, index) => (
                      <Image
                        key={index}
                        source={{
                          uri: "https://bootdey.com/img/Content/avatar/avatar5.png",
                        }}
                        style={styles.passengerPhoto}
                      />
                    ))}
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.details}
                  onPress={() => handleRateClick(item.passenger)}>
                  <Text style={styles.buttonText}>Rate passengers</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
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
  userLocation: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  userTime: {
    fontSize: 14,
    color: "#05375a",
    fontWeight: "bold",
  },
  passengersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "60%",
  },
  passengerPhoto: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginVertical: 5,
  },
  details: {
    position: "absolute",
    bottom: 20,
    right: 10,
    backgroundColor: "#DA554E",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
  noHistoryText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
});

export default HistoryDriver;
