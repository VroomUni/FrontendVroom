import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card, RadioButton, Button } from "react-native-paper";

function PreferencesSettings() {
  const [preferences, setPreferences] = useState({
    smoker: "No",
    talkative: "Yes",
    music: "No",
    food: "Yes",
    gender: "Any",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    setIsEditing(!isEditing);
  };

  const renderRadioButtonGroup = (preferenceKey, options) => {
    return (
      <View style={styles.radioContainer}>
        {options.map((option) => (
          <View key={option} style={styles.radioOption}>
            <RadioButton.Android
              value={option}
              status={
                preferences[preferenceKey] === option ? "checked" : "unchecked"
              }
              onPress={() =>
                setPreferences({ ...preferences, [preferenceKey]: option })
              }
            />
            <Text>{option}</Text>
          </View>
        ))}
      </View>
    );
  };
  return (
    <>
   
      {isEditing ? (
        <>
        <View style={styles.container}>
          <Card style={styles.cardContainer}>
            <Card.Content>
              <Text style={styles.infoText}>Smoker:</Text>
              {renderRadioButtonGroup("smoker", ["Yes", "No"])}
              <Text style={styles.infoText}>Talkative:</Text>
              {renderRadioButtonGroup("talkative", ["Yes", "No"])}
              <Text style={styles.infoText}>Loud Music:</Text>
              {renderRadioButtonGroup("music", ["Yes", "No"])}
              <Text style={styles.infoText}>Food Friendly:</Text>
              {renderRadioButtonGroup("food", ["Yes", "No"])}
              <Text style={styles.infoText}>Gender Allowed:</Text>
              {renderRadioButtonGroup("gender", ["Male", "Female", "Any"])}
            </Card.Content>
          </Card>

          <Button
            title="Skip"
            mode="contained-tonal"
            buttonColor="#172446"
            textColor="white"
            style={styles.updateButton}
            onPress={handleUpdate}
          >
            Save Changes
          </Button>
          </View>
        </>
      ) : (
        <>
         <View style={styles.container}>
         <Image style={styles.logo} source={require("../assets/PreferencesSettings.png")} />
          <Card style={styles.cardContainer}>
         
            <Card.Content>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Smoker:</Text>{" "}
                {preferences.smoker}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Talkative:</Text>{" "}
                {preferences.talkative}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Loud Music:</Text>{" "}
                {preferences.music}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Food Friendly:</Text>{" "}
                {preferences.food}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Gender Allowed:</Text>{" "}
                {preferences.gender}
              </Text>
            </Card.Content>
          </Card>
          <Button
            title="Skip"
            mode="contained-tonal"
            buttonColor="#172446"
            textColor="white"
            style={styles.updateButton}
            onPress={handleUpdate}
          >
            Update
          </Button>
          </View>
        </>
      )}
    
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    backgroundColor: "#FFF",
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingVertical: 15,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    paddingBottom: 5,
  },
  updateButton: {
    marginTop: 15,
  },
  updateButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
   
    width: 250,
    height: 250,
    marginLeft: "18%",
    
  },
});

export default PreferencesSettings;
