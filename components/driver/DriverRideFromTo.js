import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Animated,
  Easing,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useRideContext } from "../../context/UserRideContext";

const { width, height } = Dimensions.get("window");
const DriverRideFromTo = ({ setOnLocationInputPage }) => {
  const {
    setPolygonCods,
    setPolylineCods,
    isToSmu,
    setIsToSmu,
    destinationOrOrigin,
  } = useRideContext();
  const swapAnimation = useRef(new Animated.Value(0)).current;

  const translateY1 = swapAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 54], // Adjust the value based on the width of your buttons
  });

  const translateY2 = swapAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -52], // Adjust the value based on the width of your buttons
  });
  console.log(height * 0.07);
  useEffect(() => {
    // Reset animation value when the component mounts to fix a bug
    swapAnimation.setValue(isToSmu ? 0 : 1);
  }, []);

  useEffect(() => {
    // Apply animation only when isToSmu changes
    Animated.timing(swapAnimation, {
      toValue: isToSmu ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [isToSmu]);

  const swapBtns = () => {
    setIsToSmu(!isToSmu);
  };
  const rotate = swapAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const styles = StyleSheet.create({
    itineraryComponentContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1.4,
      backgroundColor: "#E2EAF4",
      width: width, // 90% of screen width
      paddingHorizontal: width * 0.03, // 5% padding on left and right
      borderBottomWidth: 1,
      borderBottomColor: "blue",
    },
    itineraryImg: {
      height: height * 0.085, // 10% of screen height
      width: width * 0.12, // 15% of screen width
      resizeMode: "contain",
    },
    innerFromToBtnsContainer: {
      width: "63%",
    },
    buttons: {
      borderRadius: 10,
      margin: 5,
      justifyContent: "center",
      backgroundColor: "#F4F4FB",
      borderColor: "black",
      borderWidth: 1,
    },
    iconContainer: {
      marginLeft: width * 0.05, // 5% margin on the left
    },
  });
  return (
    <View style={styles.itineraryComponentContainer}>
      <View>
        <Image
          style={styles.itineraryImg}
          source={require("../../assets/itinerary.png")}
        />
      </View>

      <View style={styles.innerFromToBtnsContainer}>
        <Animated.View style={{ transform: [{ translateY: translateY1 }] }}>
          <Button
            style={styles.buttons}
            mode='outlined'
            labelStyle={{ alignSelf: "center", color: "#162447" }}
            onPress={() => {
              setOnLocationInputPage();
              setPolygonCods(null);
              setPolylineCods(null);
            }}>
            {destinationOrOrigin
              ? destinationOrOrigin.name
              : isToSmu
              ? "Enter start location"
              : "Enter destination"}
          </Button>
        </Animated.View>

        <Animated.View style={{ transform: [{ translateY: translateY2 }] }}>
          <Button
            style={styles.buttons}
            mode='outlined'
            labelStyle={{ alignSelf: "center" }}
            disabled>
            SMU{" "}
          </Button>
        </Animated.View>
      </View>

      <Animated.View
        style={[{ transform: [{ rotate }] }, styles.iconContainer]}>
        <IconButton
          icon='swap-vertical'
          iconColor='#162447'
          size={35}
          onPress={swapBtns}
        />
      </Animated.View>
    </View>
  );
};

export default DriverRideFromTo;
