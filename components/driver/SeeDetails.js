// SeeDetails.js
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const SeeDetails = ({ route }) => {
  const { passengers } = route.params;
  const navigation = useNavigation();

  const handleRateButton = passenger => {
    console.log("Rate passenger:", passenger);
  };

  const handleReportButton = passenger => {
    console.log("Report passenger:", passenger);
  };

  if (!passengers) {
    return <Text>No passengers selected</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        {passengers.map((passenger, index) => (
          <View key={index} style={styles.passengerContainer}>
            <View style={styles.passengerInfo}>
              <Image
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar5.png",
                }}
                style={styles.passengerPhoto}
              />
              <View style={styles.passengerText}>
                <Text style={styles.passengerName}>
                  {passenger.firstName} {passenger.lastName}
                </Text>
                <Text>Age: 22</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => handleRateButton(passenger)}
                style={styles.button}>
                Rate
              </Button>
              <Button
                onPress={() => handleReportButton(passenger)}
                style={styles.button}>
                Report
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  passengerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  passengerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  passengerPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  passengerText: {
    marginLeft: 10,
  },
  passengerName: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 0,
    padding: 0,
  },
  button: {
    marginHorizontal: 5,
  },
});

export default SeeDetails;
