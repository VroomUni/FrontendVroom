import React, { useState, useEffect , useRef} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";

function PassengerRequestCard({
  id,
  FName,
  LName,
  rating,
  swipeAnimation,
  isFirst
  // rowHeightAnimatedValue,
  // removeRow,
  // // leftActionState,
  // // rightActionState,
  // onAccept,
  // isAccepted,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const swipeTranslateX = swipeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, isFirst ? 50 : 0],
  });
  

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

  // const handleAccept = () => {
  //   onAccept()
  //   setModalVisible(false);
  // };

  // const handleReject = () => {
  //   setModalVisible(false);
  //   removeRow(id);
  // };

  return (
    <Animated.View
  style={[styles.outerCard, {transform:[{translateX:swipeTranslateX}]}]}
    >
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.card}
      >
        {/* {isAccepted && (
          <View style={styles.acceptedContainer}>
            <Text style={styles.acceptedText}>Accepted</Text>
          </View>
        )} */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{`${FName} ${LName}`}</Text>
          <View style={styles.stars}>{renderStars(rating)}</View>
        </View>
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.detailsText}>Age: 22</Text>
            <Text style={styles.detailsText}>Non Smoker</Text>
            <Text style={styles.detailsText}>Loud Music</Text>
            <Text style={styles.detailsText}>Food Friendly</Text>
            <View style={styles.stars}>{renderStars(rating)}</View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                // onPress={handleAccept}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                // onPress={handleReject}
              >
                <Text style={styles.buttonText}>Reject</Text>
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
    margin: 5,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 12 },
    // shadowOpacity: 0.08,
    // shadowRadius: 10,
    elevation: 1,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    marginLeft: 5,
    minWidth: 80,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
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
    width: "80%",
    maxWidth: 400,
    alignSelf: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  acceptedContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  acceptedText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default PassengerRequestCard;
