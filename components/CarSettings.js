import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, Card } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import { getUserCar } from "../api/UserService";
function CarSettings() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [carDetails, setCarDetails] = useState({
    brand: "",
    model: "",
    color: "",
  });

  useEffect(() => {
    const loadCarDetails = async () => {
      if (user && user.uid) {
        try {
          const car = await getUserCar(user.uid);
          setCarDetails({
            brand: car.brand,
            model: car.model,
            color: car.color,
          });
        } catch (error) {
          console.error("Failed to fetch car details:", error);
          Alert.alert("Error", "Failed to fetch car details");
        }
      }
    };
    loadCarDetails();
  }, [user]);

  const handleInputChange = (name, value) => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const toggleEdit = async () => {
    if (editing) {
      try {
        await updateCar(user.uid, carDetails);
        Alert.alert("Success", "Car updated successfully");
      } catch (error) {
        console.error("failed to update car:", error);
        Alert.alert("error", "failed to update car");
      }
    }
    setEditing(!editing);
  };

  const renderContent = () => {
    if (editing) {
      return (
        <>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "position" : "height"}
            enabled
          >
            <View style={styles.inputRow}>
              <Text style={styles.label}>Car Brand:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleInputChange("brand", text)}
                value={carDetails.brand}
                placeholder="Enter brand"
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Car Model:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleInputChange("model", text)}
                value={carDetails.model}
                placeholder="Enter model"
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Car Color:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleInputChange("color", text)}
                value={carDetails.color}
                placeholder="Enter color"
              />
            </View>
          </KeyboardAvoidingView>
        </>
      );
    } else {
      return (
        <>
          <Card style={styles.cardContainer}>
            <Card.Content>
              <Text style={styles.infoText}>
                <Text style={{ fontWeight: "bold" }}>Brand:</Text>{" "}
                {carDetails.brand}
              </Text>
              <Text style={styles.infoText}>
                <Text style={{ fontWeight: "bold" }}>Model:</Text>{" "}
                {carDetails.model}
              </Text>
              <Text style={styles.infoText}>
                <Text style={{ fontWeight: "bold" }}>Color:</Text>{" "}
                {carDetails.color}
              </Text>
            </Card.Content>
          </Card>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/carScreen1.png")} />

      {renderContent()}

      <Button
        title="Update"
        mode="contained-tonal"
        onPress={toggleEdit}
        buttonColor="#4F709C"
        textColor="white"
        style={styles.updateButton}
      >
        {editing ? "Save" : "Edit"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    // paddingTop: "5%",
  },
  logo: {
    width: 350,
    height: 300,
    marginLeft: "5%",
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    margin: "5%",
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    paddingBottom: 5,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
  },
  updateButton: {
    backgroundColor: "#172446",
    margin: "3%",
    marginBottom: "10%",
  },
  updateButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    marginBottom: 10,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 5,

    padding: 10,
    fontSize: 16,
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#162447",
    paddingLeft: 10,
    width: 100,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default CarSettings;
