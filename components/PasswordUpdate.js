import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Alert, Image,KeyboardAvoidingView, Platform } from "react-native";
import {Button} from "react-native-paper";
import {updateUserPassword} from "../api/UserService"
function PasswordUpdate() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    try{
      console.log("password match")
    await updateUserPassword(currentPassword, newPassword)
    Alert.alert("Success", "Password successfully updated.");
    }catch(error){
      Alert.alert("Error", "Error updating password ");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "position" : "height"} enabled>
      <Image style={styles.logo} source={require("../assets/PasswordUpdate.png")} />
      <Text style={styles.label}>Current Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={setCurrentPassword}
        value={currentPassword}
      />

      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={setNewPassword}
        value={newPassword}
      />

      <Text style={styles.label}>Confirm New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />

      
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
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
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
  logo: {
   
    width: 250,
    height: 250,
    marginLeft: "18%",
    
  },
});

export default PasswordUpdate;
