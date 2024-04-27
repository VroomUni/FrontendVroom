import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { handleRequestRespone } from "../../api/RequestService";
import { enumeratePreferences } from "../../utils/UserHelpers";

function PassengerRequestCard({
  id,
  FName,
  LName,
  rating,
  swipeAnimation,
  isFirst,
  onDelete,
  isAccepted,
  age,
  preferences: passengerPrefs,
  isHighlighted,
  unhighlightRequest,
  highlightRequest,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [accepted, setAccepted] = useState(isAccepted);
  //placed in timeout to fix the laggy map animation caused by the modal load
  useEffect(() => {
    setTimeout(() => setModalVisible(isHighlighted ? true : false), 800);
  }, [isHighlighted]);
  const swipeTranslateX = swipeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, isFirst ? 50 : 0],
  });

  const renderStars = rating => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name='star'
          size={24}
          style={
            i <= rating
              ? styles.filledStar(isHighlighted)
              : styles.emptyStar(isHighlighted)
          }
        />
      );
    }
    return stars;
  };
  const handleAccept = async () => {
    // setModalVisible(false);
    unhighlightRequest();
    try {
      // method handles both decline and accept , sepcify false or true to differ
      await handleRequestRespone(id, true);
      setAccepted(true);
    } catch (err) {
      Alert.alert("An error occured while attempting to accept the request");
      console.error(err);
    }
  };

  const handleReject = async () => {
    // setModalVisible(false);
    unhighlightRequest();
    await onDelete(id);
  };

  const renderPreferences = () => {
    return Object.keys(passengerPrefs).map((attribute, i) => {
      if (passengerPrefs[attribute] === null) {
        return null;
      }
      const value = enumeratePreferences(attribute, passengerPrefs[attribute]);
      return (
        <Text key={i} style={styles.detailsText}>
          {value}
        </Text>
      );
    });
  };

  return (
    <Animated.View
      style={[
        styles.outerCard(isHighlighted),
        { transform: [{ translateX: swipeTranslateX }] },
      ]}>
      {isHighlighted === false ? <View style={styles.overlay} /> : null}
      <TouchableOpacity
        onPress={() => {
          isHighlighted ? setModalVisible(true) : highlightRequest();
        }}
        style={styles.card}>
        {accepted && (
          <View style={styles.acceptedContainer}>
            <Text style={styles.acceptedText}>Accepted</Text>
          </View>
        )}
        <View style={styles.userInfo}>
          <Text
            style={styles.userName(isHighlighted)}>{`${FName} ${LName}`}</Text>
          <View style={styles.stars}>{renderStars(rating)}</View>
        </View>
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <Text
              style={[
                styles.detailsText,
                { fontWeight: "bold" },
              ]}>{`${FName} ${LName}`}</Text>
            {/* static for now */}
            <Text style={styles.detailsText}>Age: 22</Text>
            {renderPreferences()}
            <View style={styles.stars}>{renderStars(rating)}</View>

            <View style={styles.buttonContainer}>
              {!accepted && (
                <TouchableOpacity
                  style={[styles.button, styles.acceptButton]}
                  onPress={handleAccept}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                onPress={handleReject}>
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
  outerCard: isHighlighted => ({
    backgroundColor: "#FFF",
    borderRadius: 5,
    margin: 5,
    shadowOffset: { width: 10, height: 12 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
    ...(isHighlighted && {
      borderColor: "black",
      borderWidth: 1,
      borderStyle: "solid",
    }),
  }),
  card: {
    padding: 10,
    marginBottom: 5,
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  userName: isHighlighted => ({
    fontSize: isHighlighted ? 19 : 16,
    fontWeight: "bold",
  }),
  stars: {
    flexDirection: "row",
    marginTop: 4,
  },
  filledStar: isHighlighted => ({
    color: isHighlighted === false ? "#42413e" : "#FFD700",
  }),
  emptyStar: isHighlighted => ({
    color: isHighlighted === false ? "white" : "#CCCCCC",
  }),
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
    marginTop: "95%", // Add this line to lower the modal by 100 pixels
  },
  acceptedContainer: {
    position: "absolute",
    right: 10,
    top: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  acceptedText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust opacity as needed
    borderRadius: 5,
  },
});

export default PassengerRequestCard;
