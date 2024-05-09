import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  Text,
  Image,
  Alert,
  InteractionManager,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import PassengerRequestCard from "../../components/driver/PassengerRequestCard";
import { Swipeable } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import decline from "../../assets/decine.json";
import { decode } from "@googlemaps/polyline-codec";
import { handleRequestRespone } from "../../api/RequestService";
import passengerIcon from "../../assets/people.png";
import dot from "../../assets/rec.png";

function RideCardDetails({ route }) {
  const [rideRequests, setRideRequests] = useState(route.params.requests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const mapRef = useRef();
  const polylineCods = useRef();
  const scrollRef = useRef();

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
  const bounceAnimationCount = useRef(0);

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
        bounceAnimationCount.current = bounceAnimationCount.current + 1;
        // Wait for 2 seconds and then repeat the animation
        if (bounceAnimationCount.current < 2) {
          setTimeout(() => {
            animate();
          }, 2000);
        }
      });
    };

    // Start the animation loop
    animate();
  }, []);

  const renderLeftSwapContent = (progress, dragX) => {
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
          style={{ width: 35, height: 35, zIndex: 10 }}
        />
      </Animated.View>
    );
  };

  const highlightRequest = item => {
    selectMarker(item.ride_request.id);
    const markerRef = markerRefs.current[item.ride_request.id];
    InteractionManager.runAfterInteractions(() => {
      mapRef.current.animateToRegion(
        {
          ...markerRef.props.coordinate,
          latitudeDelta: 0.1, // Zoom level
          longitudeDelta: 0.1, // Zoom level}, {
        },
        1000
      );
      markerRef.showCallout();
    });
  };

  const renderRequestItems = () => {
    // Reorder rideRequests array to move items with status = accepted to the end
    const sortedRequests = rideRequests.sort((a, b) => {
      // Move items with status = 1 to the end
      if (a.ride_request.status === 1 && b.ride_request.status !== 1) {
        return 1;
      } else if (a.ride_request.status !== 1 && b.ride_request.status === 1) {
        return -1;
      } else {
        return 0;
      }
    });

    return sortedRequests.map((item, index) => (
      <Swipeable
        key={item.ride_request.id}
        renderRightActions={(progress, dragX) =>
          renderLeftSwapContent(progress, dragX)
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
          //static for now
          rating={3}
          swipeAnimation={swipeAnimation}
          isFirst={index === 0}
          onDelete={declineRequest}
          isAccepted={item.ride_request.status === 1 ? true : false}
          age={item.age}
          preferences={item.Preference}
          isHighlighted={
            // null => initially when no request is selected
            //request cards treat null as default styling
            // true as highlighed custom styling
            // false as non highlighted custom styling
            selectedRequest === null
              ? null
              : selectedRequest === item.ride_request.id
          }
          unhighlightRequest={() => {
            selectMarker(null);
          }}
          highlightRequest={() => highlightRequest(item)}
        />
      </Swipeable>
    ));
  };

  const selectMarker = requestId => {
    setSelectedRequest(requestId);
    // Scroll to the selected request
    const index = rideRequests.findIndex(
      item => item.ride_request.id === requestId
    );
    if (index !== -1) {
      scrollRef.current.scrollTo({ y: index * 60, animated: true });
    } else {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  };
  const markerRefs = useRef({});

  const renderPassengerMarkers = () =>
    rideRequests.map(item => (
      <Marker
        key={item.ride_request.id}
        ref={ref => (markerRefs.current[item.ride_request.id] = ref)} // Store marker reference
        tracksViewChanges={false}
        coordinate={{
          longitude: item.ride_request.passengerLocation.coordinates[1],
          latitude: item.ride_request.passengerLocation.coordinates[0],
        }}
        title={item.firstName + " " + item.lastName}
        anchor={{ y: 0.5, x: 0.5 }} // Center the anchor
        onPress={() => selectMarker(item.ride_request.id)} // Track marker selection
        zIndex={1}>
        <View style={styles.markerContainer}>
          <Image source={passengerIcon} style={styles.passengerIcon} />
        </View>
      </Marker>
    ));

  useMemo(() => {
    polylineCods.current = decode(route.params.routePolyline);
  }, [route.params.routePolyline]);

  return (
    <View style={styles.container}>
      {/* must reuse map compoennt  */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          onMapReady={() => {
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
          style={{ flex: 1 }}
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
          <Marker
            coordinate={{
              longitude: polylineCods.current[0][1],
              latitude: polylineCods.current[0][0],
            }}
            title='Departure'
            anchor={{ x: 0.5, y: 0.5 }}>
            <View style={styles.markerContainer}>
              <Image source={dot} style={styles.markerImage} />
            </View>
          </Marker>
          <Marker
            coordinate={{
              longitude:
                polylineCods.current[polylineCods.current.length - 1][1],
              latitude:
                polylineCods.current[polylineCods.current.length - 1][0],
            }}
            title='Destination'
          />
          {rideRequests.length > 0 && renderPassengerMarkers()}
        </MapView>
      </View>
      {rideRequests.length > 0 ? (
        <>
          <ScrollView ref={scrollRef}>{renderRequestItems()}</ScrollView>
        </>
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
  },
  mapContainer: {
    height: "55%",
    margin: 3,
    borderRadius: 10,
    overflow: "hidden",
  },
  leftAction: {
    borderRadius: 5,
    margin: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
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
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  passengerIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  markerImage: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  // NoSuggestionImage: {
  //   width: "150%",
  //   height: "50%",
  //   resizeMode: "contain",
  //   marginBottom: 5,
  // },
});

export default RideCardDetails;
