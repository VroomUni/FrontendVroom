import React, { useState, useRef, useEffect } from "react";
import DriverCard from "../../components/DriverCard";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import Swiper from "react-native-deck-swiper";
import LottieView from "lottie-react-native";
import {
  Snackbar,
  Button,
  Portal,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  fetchRidesData,
  fetchAllUnrequestedRides,
} from "../../api/RideService";
import { createRequest } from "../../api/RequestService";
import { useAuth } from "../../context/AuthContext";

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
  const [swipedAll, setSwipedAll] = useState(false);
  const { passengerLocation, rideIds, date: filterDate } = route.params;
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (rideIds) {
          const rides = await fetchRidesData(rideIds);
          setRidesData(rides);
        } else {
          setSwipedAll(true);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        Alert.alert("There was an error displaying suggested rides");
      }
    };

    fetchData();
  }, []);

  const onSwipedLeft = cardIndex =>
    // Handle the 'no request' logic here
    {
      console.log("Swiped left, no request sent for: ", ridesData[cardIndex]);
    };

  const onSwipedRight = async cardIndex => {
    console.log("Swiped right, request sent for");
    try {
      const resonse = await createRequest({
        passengerLocation: passengerLocation.coords,
        passengerId: user.uid,
        RideOccurenceId: ridesData[cardIndex].id,
      });
      setSentVisible(true);
    } catch (err) {
      console.error(err);
      Alert.alert(
        " error sending a request , This may be because a request is already sent to this ride "
      );
    }
  };
  const onDismissSnackBar = () => setSentVisible(false);
  console.log("IS LOADING", loading);
  // console.log("RIDE DATA", ridesData);

  const onSwipedAll = () => {
    setSwipedAll(true);
    setRidesData(null);
  };

  const fetchAllRides = async () => {
    try {
      const allRides = await fetchAllUnrequestedRides(user.uid, filterDate);
      if (allRides.length === 0) {
        Alert.alert("There are no more Rides on ", filterDate.split("T")[0]);
        return;
      }
      setRidesData(allRides);
      setSwipedAll(false);
    } catch (err) {
      console.error(err);
      Alert.alert("There was an error fetching all rides");
    }
  };
  return (
    <PaperProvider>
      <View style={styles.pageContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Swipe Your Way</Text>
        </View>
        {!loading ? (
          ridesData && (
            <>
              <Swiper
                cards={ridesData}
                renderCard={data => (
                  <DriverCard
                    data={data}
                    passengerPreferences={passengersPreferences}
                    navigation={navigation}
                    passengerLocation={passengerLocation}
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
                onSwipedAll={onSwipedAll}
              />

              <View style={styles.animationContainer}>
                <LottieView
                  style={styles.animation}
                  source={require("../../assets/SwipeAnimation.json")}
                  autoPlay
                  loop
                />
              </View>
            </>
          )
        ) : (
          <Text>LOADING...</Text>
        )}
        {swipedAll && (
          <View style={styles.allCardsSwipedContainer}>
            <Image
              style={styles.NoSuggestionImage}
              source={require("../../assets/noMoreFilter.png")}
            />
            <Text style={styles.allCardsSwipedText}>
              No more filtered suggestions
            </Text>
            <Button
              style={styles.showAllButton}
              mode='contained'
              onPress={fetchAllRides}>
              Show All
            </Button>
          </View>
        )}
        <Portal>
          <Snackbar
            visible={requestSentVisible}
            onDismiss={onDismissSnackBar}
            duration={800}
            style={{ backgroundColor: "green" }}>
            request sent !
          </Snackbar>
        </Portal>
      </View>
    </PaperProvider>
  );
}

export default PassengerSearchRides;
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#ecf0f1",

    paddingTop: 0,
  },
  allCardsSwipedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  NoSuggestionImage: {
    width: "150%",
    height: "50%",
    resizeMode: "contain",
    marginBottom: 5,
  },
  showAllButton: {
    marginTop: 20,
    backgroundColor: "#162447",
    borderRadius: 15,
  },
  allCardsSwipedText: {
    fontSize: 20,
  },
  headerContainer: {
    marginBottom: 20,
    backgroundColor: "#2c3e50",
    width: "100%",
  },
  headerText: {
    margin: 30,
    fontSize: 28,
    color: "#e8f4f8",
    textAlign: "center",
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
    flex: 2,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: "120%",
  },
  animation: {
    width: "50%",
    height: "50%",
  },
});
