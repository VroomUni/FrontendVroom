import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Image, Animated, Easing } from "react-native";
import { Surface, Button, IconButton } from "react-native-paper";

const DriverRideFromTo = ({
  isToSmu,
  setIsToSmu,
  setOnLocationInputPage,
  destinationOrOrigin,
}) => {
  const swapAnimation = useRef(new Animated.Value(0)).current;

  const translateY1 = swapAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 51], // Adjust the value based on the width of your buttons
  });

  const translateY2 = swapAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50], // Adjust the value based on the width of your buttons
  });

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

  console.log(destinationOrOrigin);
  return (
    <Surface mode='flat' style={styles.itineraryComponentContainer}>
      <View>
        <Image
          style={styles.itineraryImg}
          source={require("../assets/itinerary.png")}
        />
      </View>

      <View style={styles.innerFromToBtnsContainer}>
        <Animated.View style={{ transform: [{ translateY: translateY1 }] }}>
          <Button
            style={styles.buttons}
            mode='outlined'
            labelStyle={{ alignSelf: "center" }}
            onPress={() => {
              setOnLocationInputPage();
             
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
          iconColor='black'
          size={35}
          onPress={swapBtns}
        />
      </Animated.View>
    </Surface>
  );
};

export default DriverRideFromTo;

const styles = StyleSheet.create({
  itineraryComponentContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1.7,
    backgroundColor: "#96DDF4",
  },
  itineraryImg: { height: 65, width: 50, resizeMode: "contain" },

  innerFromToBtnsContainer: {
    width: "60%",
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
    alignItems: "center", // Center the IconButton horizontally
    justifyContent: "center", // Center the IconButton vertically
    marginLeft: 30,
  },
});
