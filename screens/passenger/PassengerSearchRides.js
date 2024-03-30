import React, { useState, useRef, useEffect } from "react";
import DriverCard from "../../components/DriverCard";
import { StyleSheet, View, Text, Animated } from "react-native";
import Swiper from "react-native-deck-swiper";
import LottieView from "lottie-react-native";
import { Snackbar, Provider as PaperProvider } from "react-native-paper";
import { fetchRidesData } from "../../api/RideService";

const passengersPreferences = {
  smoking: "no",
  Talkative: "light chitchat",
  eating: "no",
  musicGenre: "loud music",
};

const driversData = [
  {
    id: 1,
    firstName: "Ahmed",
    lastName: "Jouni",
    rating: 4,
    smoking: "no",
    Talkative: "light chitchat",
    eating: "no",
    musicGenre: "loud music",
    time: "17:30",
    departure: "Mannouba",
    destination: "SMU",
    imageUri: "https://bootdey.com/img/Content/avatar/avatar1.png",
  },
  {
    id: 2,
    firstName: "Laila",
    lastName: "Mahmoud",
    rating: 5,
    smoking: "yes",
    Talkative: "quiet",
    eating: "yes",
    musicGenre: "calm music",
    time: "18:00",
    departure: "Carthage",
    destination: "SMU",
    imageUri: "https://bootdey.com/img/Content/avatar/avatar2.png",
  },
  {
    id: 3,
    firstName: "Sami",
    lastName: "Rayan",
    rating: 3,
    smoking: "yes",
    Talkative: "chatty",
    eating: "no",
    musicGenre: "Pop Music",
    time: "19:45",
    departure: "SMU",
    destination: "Marsa",
    imageUri: "https://bootdey.com/img/Content/avatar/avatar3.png",
    route: {
      encodedPath: "encodedPolylineStringForAhmed",
    },
  },
];

function PassengerSearchRides({ navigation, route }) {
  const [requestSentVisible, setSentVisible] = useState(false);
  const [ridesData, setRidesData] = useState([]);
  const [loading, setLoading] = useState(true);
  //investigate with response data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rides = await fetchRidesData(route.params);
        setRidesData(rides);
        setLoading(false);

      } catch (err) {
        console.error(err);
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
  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Swipe Your Way</Text>
      </View>
      {!loading ? (
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
