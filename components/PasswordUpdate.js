import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Alert } from "react-native";
import {Button} from "react-native-paper"
function PasswordUpdate() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (name, value) => {
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdatePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    Alert.alert("Success", "Password successfully updated.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={(value) => handleChange("currentPassword", value)}
        value={passwords.currentPassword}
      />

      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={(value) => handleChange("newPassword", value)}
        value={passwords.newPassword}
      />

      <Text style={styles.label}>Confirm New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={(value) => handleChange("confirmPassword", value)}
        value={passwords.confirmPassword}
      />

      {/* <Button title="Update Password" onPress={handleUpdatePassword} /> */}
      <Button
        title="Skip"
        mode="contained-tonal"
        buttonColor="#162447"
        textColor="white"
        style={styles.updateButton}
        onPress={handleUpdatePassword}
      >
        Update Password
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "white",
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
    marginBottom: 20,
    paddingLeft:10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#162447",
  },
});

export default PasswordUpdate;
