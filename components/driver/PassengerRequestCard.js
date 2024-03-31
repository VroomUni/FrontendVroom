import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Snackbar } from "react-native-paper";



function PassengerRequestCard({
  id,
  FName,
  LName,
  rating,
  rowHeightAnimatedValue,
  removeRow,
  leftActionState,
  rightActionState,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const [accepted, setAccepted] = useState(false);

  // console.log('in passenger',rowHeightAnimatedValue)

 if(rightActionState){
  Animated.timing(rowHeightAnimatedValue,{
    toValue:0,
    duration:200
  }).start(()=>removeRow());
 }
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name="star"
          size={24}
          style={i <= rating ? styles.filledStar : styles.emptyStar}
        />
      );
    }
    return stars;
  };

  const handleAccept = () => {
    console.log('accepted');
    setAccepted(true);
    
    setModalVisible(false);
  };

  const handleReject = () => {
    setModalVisible(false);
    removeRow(id);
   
  };

  const showDetails = () => {
    setModalVisible(true);
  };

  return (
    
    <Animated.View
      style={[styles.outerCard, { height: rowHeightAnimatedValue }]}
    >
      <TouchableOpacity
        onPress={showDetails}
        style={styles.card}
        underlayColor={"#aaa"}
      >
 
        {accepted && (
          <View style={styles.acceptedContainer}>
            <Text style={styles.acceptedText}>Accepted</Text>
          </View>
        )}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{`${FName} ${LName}`}</Text>
          <View style={styles.stars}>{renderStars(rating)}</View>
        </View>
       
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
          <Text style={styles.modalName}>{`${FName} ${LName}`}</Text>
            <Text style={styles.detailsText}>Age: 22</Text>
            <Text style={styles.detailsText}>Non Smoker</Text>
            <Text style={styles.detailsText}>Loud Music</Text>
            <Text style={styles.detailsText}>Food Friendly</Text>
            <View style={styles.stars}>{renderStars(rating)}</View>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                
              >
                <Text style={styles.buttonText} onPress={handleAccept}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                
              >
                <Text style={styles.buttonText} onPress={handleReject} >Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    </Animated.View>
    


  );
}

const styles = StyleSheet.create({
  outerCard: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 65,
    margin: 5,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stars: {
    flexDirection: "row",
    marginTop: 4,
  },
  filledStar: {
    color: "#FFD700",
  },
  emptyStar: {
    color: "#CCCCCC",
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    marginLeft: 5,
    minWidth: 80,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  rejectButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    width: "80%", // Adjust this to control the modal width
    maxWidth: 400, // You might want to limit the maximum width
    alignSelf: "center", // Center the modal in the screen
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.25, // Shadow for iOS
    shadowRadius: 3.84, // Shadow for iOS
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, // Add some margin below the name
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5, // Add some space between details
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20, // Add space between the buttons and the text above
  },
  acceptedContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#4CAF50', // Background color for the accepted status
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  acceptedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default PassengerRequestCard;
