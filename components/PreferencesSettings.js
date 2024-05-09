import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { Card, RadioButton, Button } from "react-native-paper";
import { getUserPreferences, updateUserPreferences } from "../api/UserService";
import { useAuth } from "../context/AuthContext";

function PreferencesSettings() {
  const [preferences, setPreferences] = useState({
    smoking: "",
    talkative: "",
    loudMusic: "",
    foodFriendly: "",
    genderAllowed: "",
  });
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchPreferences = async () => {
      if (user && user.uid) {
        try {
          const fetchedPreferences = await getUserPreferences(user.uid);
          setPreferences({
            smoking: fetchedPreferences.smoking,
            talkative: fetchedPreferences.talkative,
            loudMusic: fetchedPreferences.loudMusic,
            foodFriendly: fetchedPreferences.foodFriendly,
            genderAllowed: fetchedPreferences.girlsOnly
              ? "Girls Only"
              : fetchedPreferences.boysOnly
              ? "Boys Only"
              : "Any",
          });
        } catch (error) {
          console.error("Failed to fetch preferences", error);
          Alert.alert("Error", "Failed to fetch preferences");
        }
      }
    };
    fetchPreferences();
  }, [user]);
  const handleUpdate = async () => {
    if (isEditing) {
      try {
        await updateUserPreferences(user.uid, {
          smoking: preferences.smoking,
          talkative: preferences.talkative,
          loudMusic: preferences.loudMusic,
          foodFriendly: preferences.foodFriendly,
          girlsOnly: preferences.genderAllowed === "Girls Only",
          boysOnly: preferences.genderAllowed === "Boys Only",
        });
        Alert.alert("Sucess", "Preferences updated successfully");
      } catch (error) {
        console.error("Failed to update preferences", error);
        Alert.alert("Error", "Failed to update preferences");
      }
    }
    setIsEditing(!isEditing);
  };

  const renderRadioButtonGroup = (preferenceKey, options) => {
    return (
      <View style={styles.radioContainer}>
        {options.map(option => (
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
                {renderRadioButtonGroup("smoking", ["Yes", "No"])}
                <Text style={styles.infoText}>Talkative:</Text>
                {renderRadioButtonGroup("talkative", ["Yes", "No"])}
                <Text style={styles.infoText}>Loud Music:</Text>
                {renderRadioButtonGroup("loudMusic", ["Yes", "No"])}
                <Text style={styles.infoText}>Food Friendly:</Text>
                {renderRadioButtonGroup("foodFriendly", ["Yes", "No"])}
                <Text style={styles.infoText}>Gender Allowed:</Text>
                {renderRadioButtonGroup("genderAllowed", [
                  "Boys Only",
                  "Girls Only",
                  "Any",
                ])}
              </Card.Content>
            </Card>

            <Button
              title='Skip'
              mode='contained-tonal'
              buttonColor='#172446'
              textColor='white'
              style={styles.updateButton}
              onPress={handleUpdate}>
              Save Changes
            </Button>
          </View>
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require("../assets/PreferencesSettings.png")}
            />
            <Card style={styles.cardContainer}>
              <Card.Content>
                <Text style={styles.infoText}>
                  <Text style={styles.boldText}>Smoker:</Text>{" "}
                  {preferences.smoking}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.boldText}>Talkative:</Text>{" "}
                  {preferences.talkative}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.boldText}>Loud Music:</Text>{" "}
                  {preferences.loudMusic}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.boldText}>Food Friendly:</Text>{" "}
                  {preferences.foodFriendly}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.boldText}>Gender Allowed:</Text>{" "}
                  {preferences.genderAllowed}
                </Text>
              </Card.Content>
            </Card>
            <Button
              title='Skip'
              mode='contained-tonal'
              buttonColor='#172446'
              textColor='white'
              style={styles.updateButton}
              onPress={handleUpdate}>
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
