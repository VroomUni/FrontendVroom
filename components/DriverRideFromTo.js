import { useState, useRef } from "react";
import { StyleSheet, Text, View, Image, Animated, Easing } from "react-native";
import { Surface,  Button, IconButton } from "react-native-paper";

const DriverRideFromTo = ({ setLocationInputVisible }) => {
  const [isToSmu, setIsToSmu] = useState(true);
  const swapAnimation = useRef(new Animated.Value(0)).current;

  const translateY1 = swapAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 51], // Adjust the value based on the width of your buttons
  });

  const translateY2 = swapAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50], // Adjust the value based on the width of your buttons
  });

  const rotateIcon = () => {
    Animated.timing(swapAnimation, {
      toValue: isToSmu ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      setIsToSmu(!isToSmu);
    });
  };
  const rotate = swapAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

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
            onPress={() => setLocationInputVisible(true)}>
            {isToSmu ? "Enter start location" : "Enter destination"}
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
          iconColor='white'
          size={35}
          onPress={rotateIcon}
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
    flex: 1,
    backgroundColor: "#5e69ee",
    borderWidth: 1,
    borderColor: "black",
  },
  itineraryImg: { height: 65, width: 50, resizeMode: "contain" },

  innerFromToBtnsContainer: {
    width: 250,
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
