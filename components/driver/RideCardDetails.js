import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ScrollView } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import PassengerRequestCard from "./PassengerRequestCard";
import { Swipeable } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import decline from "../../assets/decine.json";

function RideCardDetails() {

const [rideRequests, setRideRequests] = useState([
  {
    id: "1",
    FName: "Emma",
    LName: "Smith",
    location: "Central Park",
    time: "10:00 AM",
    requests: "2",
    rating: 4,
  },
  {
    id: "2",
    FName: "Liam",
    LName: "Johnson",
    location: "Madison Square",
    time: "11:00 AM",
    requests: "1",
    rating: 3,
  },
  {
    id: "3",
    FName: "Olivia",
    LName: "Williams",
    location: "Union Square",
    time: "12:00 PM",
    requests: "3",
    rating: 5,
  },
  {
    id: "4",
    FName: "Noah",
    LName: "Brown",
    location: "Times Square",
    time: "01:00 PM",
    requests: "2",
    rating: 4,
  },
  {
    id: "5",
    FName: "Ava",
    LName: "Jones",
    location: "Columbus Circle",
    time: "02:00 PM",
    requests: "1",
    rating: 2,
  },
]);


  const deleteCard = (id) => {
    setRideRequests(rideRequests.filter((item) => item.id !== id));
  };

//for initial swipe bounce
const swipeAnimation = useRef(new Animated.Value(0)).current;

//counts how many time the initial requests has bounced , currently stops after 2 bounces
const animationCount = useRef(0);

// animation for request bounce on component mount (indicator to swipe)
useEffect(() => {
  const animate = () => {
    Animated.sequence([
      // Trigger initial swipe animation
      Animated.timing(swipeAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      // Initial jump
      Animated.timing(swipeAnimation, {
        toValue: -0.5,
        duration: 250,
        useNativeDriver: true,
      }),
      // First bounce
      Animated.timing(swipeAnimation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      // Second bounce
      Animated.timing(swipeAnimation, {
        toValue: -0.2,
        duration: 200,
        useNativeDriver: true,
      }),
      // Third bounce
      Animated.timing(swipeAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      // Fourth bounce
      Animated.timing(swipeAnimation, {
        toValue: -0.1,
        duration: 50,
        useNativeDriver: true,
      }),
      // Final position
      Animated.timing(swipeAnimation, {
        toValue: 0,
        duration: 20,
        useNativeDriver: true,
      }),
    ]).start(() => {
      animationCount.current = animationCount.current + 1;
      // Wait for 5 seconds and then repeat the animation
      if (animationCount.current < 3) {
        setTimeout(() => {
          animate();
        }, 4000);
      }
    });
  };

  // Start the animation loop
  animate();
}, []);

  const renderRightActions = (progress, dragX) => {

    //for the degrading  red colors on swipe
    const backgroundColor = dragX.interpolate({
      inputRange: [-301, -300, 0], // Define the input range based on dragX values
      outputRange: [
        "rgba(255, 0, 0, 1)",
        "rgba(255, 0, 0, 1)",
        "rgba(255, 0, 0, 0.2)",
      ], 
      extrapolate: "clamp", // Clamp values that fall outside of the input range
    });

    


    return (
      <Animated.View style={[styles.leftAction, { backgroundColor }]}>
        {/* //decline lottie icon */}
        <LottieView
          source={decline}
          autoPlay
          loop={false}
          style={{ width: 40, height: 40, zIndex: 10 }}
        />
      </Animated.View>
    );
  };



  const renderItems = () => {
    return rideRequests.map((item, index) => (
      <Swipeable
        key={item.id}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX)
        }
        onSwipeableOpen={(direction) => {
          
          if (direction === 'right') {
            deleteCard(item.id);
          }
        }}
        >
        <PassengerRequestCard
          key={item.id}
          id={item.id}
          FName={item.FName}
          LName={item.LName}
          location={item.location}
          time={item.time}
          rating={item.rating}
          swipeAnimation={swipeAnimation}
          isFirst={index === 0}
          onDelete={deleteCard}
        />
      </Swipeable>
    ));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
      />
      <ScrollView>{renderItems()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  map: {
    height: "50%",
  },
  leftAction: {
    borderRadius: 5,
    margin: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  rightAction: {
    borderRadius: 5,
    margin: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  actionText: {
    fontSize: 18,
    padding: 10,
  },
});

export default RideCardDetails;
