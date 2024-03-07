import React from 'react'
import DriverCard from '../components/DriverCard'
import { StyleSheet, View,Text } from 'react-native'
import Swiper from "react-native-deck-swiper";
import LottieView from 'lottie-react-native';

const driversData = [
    {
      id: 1,
      name: "Ahmed Jouni",
      rating: 4,
      preferences: ["Non-Smoker", "Talkative", "Soft Music", "No Food"],
      time: "17:30",
      departure: "Mannouba",
      destination:"SMU",
      imageUri: 'https://bootdey.com/img/Content/avatar/avatar1.png'
    },
    {
      id: 2,
      name: "Laila Mahmoud",
      rating: 5,
      preferences: ["Non-Smoker", "Quiet", "Classical Music", "Snacks Allowed"],
      time: "18:00",
      departure: "Carthage",
      destination:"SMU",
      imageUri: 'https://bootdey.com/img/Content/avatar/avatar2.png'
    },
    {
      id: 3,
      name: "Sami Rayan",
      rating: 3,
      preferences: ["Smoker", "Chatty", "Pop Music", "No Food"],
      time: "19:45",
      departure: "SMU",
      destination:"Marsa",
      imageUri: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      route:{
        encodedPath:"encodedPolylineStringForAhmed",
      
      }
    },
  ];
  

function SearchRides() {
  const onSwipedLeft = (cardIndex) => {
    console.log('Swiped left, no request sent for: ', driversData[cardIndex]);
    // Handle the 'no request' logic here
  };

  const onSwipedRight = (cardIndex) => {
    console.log('Swiped right, request sent for: ', driversData[cardIndex]);
    // Send the request to the driver here
  };
  return (
    <View style={styles.pageContainer}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Swipe Your Way</Text>
      
    </View>
    <Swiper
      cards={driversData}
      renderCard={(card) => <DriverCard driver={card} />}
      onSwipedLeft={onSwipedLeft}
      onSwipedRight={onSwipedRight}
      cardIndex={0}
      backgroundColor={'transparent'}
      stackSize={2}
      cardVerticalMargin={50}
      containerStyle={styles.swiperContainer}
      animateOverlayLabelsOpacity
      animateCardOpacity
      swipeBackCard
    />
     <View style={styles.animationContainer}>
       <LottieView style={styles.animation} source={require('../assets/SwipeAnimation.json')} autoPlay loop />
      </View>
  </View>
    
  )
}

export default SearchRides
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#ecf0f1', 
    
    paddingTop: 0, 
  },
  headerContainer: {
    marginBottom: 20, 
    backgroundColor:"#2c3e50",
    width: '100%',
  },
  headerText: {
    marginTop:50,
    fontSize: 28,
    color: '#e8f4f8',
    
    textAlign: 'center', // Center the header text
    marginBottom:30
  },
  subHeaderText: {
    fontSize: 18,
    color: '#e8f4f8',
    textAlign: 'center', 
    marginBottom: 10, 
  },
  swiperContainer: {
    flexGrow: 1, 
    justifyContent: 'center', 
  },
  animationContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end', // Aligns children to the end of the container
    alignItems: 'flex-end',
   marginTop:"100%",
  
  },
  animation: {
    width: '50%',
    height: '50%',
    
  },
})