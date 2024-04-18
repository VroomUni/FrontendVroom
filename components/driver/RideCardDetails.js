import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  Text,
  Image,
  Alert,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import PassengerRequestCard from "./PassengerRequestCard";
import { Swipeable } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import decline from "../../assets/decine.json";
import { decode } from "@googlemaps/polyline-codec";
import { handleRequestRespone } from "../../api/RequestService";

function RideCardDetails({ route }) {
  const [rideRequests, setRideRequests] = useState(route.params.requests);
  // console.log(route.params.requests);

  const declineRequest = async reqId => {
    try {
      await handleRequestRespone(reqId, false);
      setRideRequests(
        rideRequests.filter(item => item.ride_request.id !== reqId)
      );
    } catch (err) {
      Alert.alert("There was an error while attempting to decline the request");
      console.error(err);
    }
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
        // Wait for 2 seconds and then repeat the animation
        if (animationCount.current < 2) {
          setTimeout(() => {
            animate();
          }, 2000);
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
        key={item.ride_request.id}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX)
        }
        onSwipeableOpen={direction => {
          if (direction === "right") {
            declineRequest(item.ride_request.id);
          }
        }}>
        <PassengerRequestCard
          id={item.ride_request.id}
          FName={item.firstName}
          LName={item.lastName}
          // location={item.ride_request.passengerLocation.coordinates}
          //static for now
          rating={3}
          swipeAnimation={swipeAnimation}
          isFirst={index === 0}
          onDelete={declineRequest}
          isAccepted={item.ride_request.status === 1 ? true : false}
          age={item.age}
          preferences={item.Preference}
        />
      </Swipeable>
    ));
  };
  const mapRef = useRef();
  const polylineCods = useRef();
  useMemo(() => {
    polylineCods.current = decode(route.params.routePolyline);
  }, [route.params.routePolyline]);
  return (
    <View style={styles.container}>
      {/* must reuse map compoennt  */}
      <MapView
        ref={mapRef}
        onMapLoaded={() => {
          mapRef.current.fitToCoordinates(
            polylineCods.current.map(coord => ({
              latitude: coord[0],
              longitude: coord[1],
            })),
            {
              edgePadding: {
                top: 40,
                bottom: 40,
                right: 10,
                left: 10,
              },
              animated: true,
            }
          );
        }}
        provider={PROVIDER_GOOGLE}
        style={{ height: "50%" }}
        initialRegion={{
          latitude: 36.7277622657912, // Latitude of Tunisia
          longitude: 10.203072895008471, // Longitude of Tunisia
          latitudeDelta: 1, // Zoom level
          longitudeDelta: 1, // Zoom level
        }}>
        <Polyline
          coordinates={polylineCods.current.map(coord => ({
            latitude: coord[0],
            longitude: coord[1],
          }))}
          strokeWidth={3}
          strokeColor='blue'
        />
        {/* <Marker
          coordinate={{
            longitude: passengerLocation.coords.longitude,
            latitude: passengerLocation.coords.latitude,
          }}
          title='YOU'
        /> */}
      </MapView>
      {rideRequests.length > 0 ? (
        <ScrollView>{renderItems()}</ScrollView>
      ) : (
        <View style={styles.noRequestsContainer}>
          {/* <Image
            style={styles.NoSuggestionImage}
            source={require("../../assets/noMoreFilter.png")}
          /> */}
          <Text>It's quiet for now </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 10,
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
  noRequestsContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  // NoSuggestionImage: {
  //   width: "150%",
  //   height: "50%",
  //   resizeMode: "contain",
  //   marginBottom: 5,
  // },
});

export default RideCardDetails;
