import React, { useState, useRef, useEffect } from "react";
import DriverCard from "../../components/DriverCard";
import { StyleSheet, View, Text, Animated, Alert } from "react-native";
import Swiper from "react-native-deck-swiper";
import LottieView from "lottie-react-native";
import { Snackbar, Provider as PaperProvider } from "react-native-paper";
import { fetchRidesData } from "../../api/RideService";

const passengersPreferences = {
  smoking: false,
  talkative: false,
  foodFriendly: false,
  loudMusic: true,
  girlsOnly: true,
  boysOnly: null,
};

function PassengerSearchRides({ navigation, route }) {
  const [requestSentVisible, setSentVisible] = useState(false);
  const [ridesData, setRidesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const rideIds = route.params;
  //investigate with response data
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("IDS ", rideIds);
        if (rideIds) {
          const rides = await fetchRidesData(rideIds);
          setRidesData(rides);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        Alert.alert("There was an error displaying suggested rides");
      }
    };

    fetchData();
  }, []);

  const onSwipedLeft = cardIndex => {
    console.log("Swiped left, no request sent for: ", ridesData[cardIndex]);
    // Handle the 'no request' logic here
  };

  const onSwipedRight = cardIndex => {
    console.log("Swiped right, request sent for: ", ridesData[cardIndex]);
    setSentVisible(!requestSentVisible);
  };
  const onDismissSnackBar = () => setSentVisible(false);
  console.log("IS LOADING", loading);
  console.log("RIDE DATA", ridesData);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Swipe Your Way</Text>
      </View>
      {!loading ? (
        ridesData ? (
          <>
            <Swiper
              cards={ridesData}
              renderCard={data => (
                <DriverCard
                  data={data}
                  passengerPreferences={passengersPreferences}
                  navigation={navigation}
                />
              )}
              onSwipedLeft={onSwipedLeft}
              onSwipedRight={onSwipedRight}
              cardIndex={0}
              backgroundColor={"transparent"}
              stackSize={2}
              cardVerticalMargin={50}
              containerStyle={styles.swiperContainer}
              animateOverlayLabelsOpacity
              animateCardOpacity
              swipeBackCard
            />

            <Snackbar
              visible={requestSentVisible}
              onDismiss={onDismissSnackBar}
              duration={400}
              style={styles.snackbarstyle}>
              request sent !
            </Snackbar>

            <View style={styles.animationContainer}>
              <LottieView
                style={styles.animation}
                source={require("../../assets/SwipeAnimation.json")}
                autoPlay
                loop
              />
            </View>
          </>
        ) : (
          <Text>Nothing To Show</Text>
        )
      ) : (
        <Text>LOADING...</Text>
      )}
    </View>
  );
}

export default PassengerSearchRides;
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#ecf0f1",

    paddingTop: 0,
  },
  headerContainer: {
    marginBottom: 20,
    backgroundColor: "#2c3e50",
    width: "100%",
  },

  headerText: {
    marginTop: 50,
    fontSize: 28,
    color: "#e8f4f8",

    textAlign: "center",
    marginBottom: 30,
  },
  subHeaderText: {
    fontSize: 18,
    color: "#e8f4f8",
    textAlign: "center",
    marginBottom: 10,
  },
  swiperContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },

  animationContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: "100%",
  },
 
  animation: {
    width: "50%",
    height: "50%",
  },

  snackbarstyle: {
    backgroundColor: "green",
    position: "absolute",
    bottom: 20,

    right: 0,

    width: "70%",
  },
});
