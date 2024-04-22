import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TextInput } from "react-native";
import { Button, Card } from "react-native-paper";

function CarSettings() {
  const [editing, setEditing] = useState(false); // State to track edit mode
  const [carDetails, setCarDetails] = useState({
    brand: "Toyota",
    model: "Corolla",
    color: "Red",
  });

  const handleInputChange = (name, value) => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setEditing(!editing); // Toggle the editing state
  };

  const renderContent = () => {
    if (editing) {
      return (
        <>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange("brand", text)}
            value={carDetails.brand}
            placeholder="Enter brand"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange("model", text)}
            value={carDetails.model}
            placeholder="Enter model"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange("color", text)}
            value={carDetails.color}
            placeholder="Enter color"
          />
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
    paddingTop: "10%",
  },
  logo: {
    width: 350,
    height: 350,
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
    paddingVertical: 15,
    marginBottom: 10,
    margin:10,
    paddingLeft:10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#162447",
    paddingLeft:10
  },
});

export default CarSettings;
