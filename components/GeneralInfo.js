import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-paper";

function GeneralInfo() {
  const [isEditing, setIsEditing] = useState(false);

  const [userDetails, setUserDetails] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phoneNo: "23567146",
  });

  const [editableInfo, setEditableInfo] = useState({ ...userDetails });

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    setUserDetails({ ...editableInfo });
    setIsEditing(false);
  };

  const handleChange = (name, value) => {
    setEditableInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete your profile?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => console.log("Deleted Account."),
        },
      ],
      { cancelable: false }
    );
  };

  const renderField = (fieldName, label) => {
    return isEditing ? (
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleChange(fieldName, value)}
        value={editableInfo[fieldName]}
        placeholder={label}
        clearButtonMode="always"
      />
    ) : (
      <Text style={styles.infoText}>{userDetails[fieldName]}</Text>
    );
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleEditPress} style={styles.editIconContainer}>
          <Icon name="pencil" size={35} color="#000" />
        </TouchableOpacity>
      <View style={styles.profilePicContainer}>
        <Image
          source={{ uri: "https://bootdey.com/img/Content/avatar/avatar7.png" }}
          style={styles.profilePic}
        />

      
      </View>
    

      {isEditing ? (
        <>
          {renderField("fullName", "Full Name")}
          {renderField("email", "Email")}
          {renderField("phoneNo", "Phone No")}
         
        </>
      ) : (
        <>
          <Card style={styles.cardContainer}>
            <Card.Content>
              <Text style={styles.infoText}>
                <Text style={{ fontWeight: "bold" }}>Full Name:</Text>{" "}
                {userDetails.fullName}
              </Text>
              <Text style={styles.infoText}>
                <Text style={{ fontWeight: "bold" }}>Email:</Text>{" "}
                {userDetails.email}
              </Text>
              <Text style={styles.infoText}>
                <Text style={{ fontWeight: "bold" }}>Phone Number:</Text>{" "}
                {userDetails.phoneNo}
              </Text>
            </Card.Content>
          </Card>
        </>
      )}

      <View style={styles.SaveContainer}>
        {isEditing ? (
          <Button title="Save Changes" onPress={handleSaveChanges} />
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteProfile}
      >
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}
//todo profile picture update

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width:'100%'
  },
  cardContainer:{
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingVertical: 15,
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop:"20%"
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    paddingBottom: 5,
  },
  input: {
    fontSize: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  SaveContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  editIconContainer: {
    position: 'absolute',
    top: 0,
    right: 20,
    marginTop:"20%"
  },
});

export default GeneralInfo;
