import React from 'react'
import DriverCard from '../components/DriverCard'
import { StyleSheet, View,Text } from 'react-native'
import Swiper from "react-native-deck-swiper";


const driversData = [
    {
      id: 1,
      name: "Ahmed Jouni",
      rating: 4,
      preferences: ["Non-Smoker", "Talkative", "Soft Music", "No Food"],
      time: "17:30",
      location: "Mannouba",
      imageUri: 'https://bootdey.com/img/Content/avatar/avatar1.png'
    },
    {
      id: 2,
      name: "Laila Mahmoud",
      rating: 5,
      preferences: ["Non-Smoker", "Quiet", "Classical Music", "Snacks Allowed"],
      time: "18:00",
      location: "Carthage",
      imageUri: 'https://bootdey.com/img/Content/avatar/avatar2.png'
    },
    {
      id: 3,
      name: "Sami Rayan",
      rating: 3,
      preferences: ["Smoker", "Chatty", "Pop Music", "No Food"],
      time: "19:45",
      location: "Sfax",
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
          <Text style={styles.headerText}>
          Swipe Right to Ride
         
          </Text>
          <Text style={styles.headerText}>
          Left to slide
         
          </Text>
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
        containerStyle={{ backgroundColor: 'transparent' }}
       
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
      />
      
    </View>
    
  )
}

export default SearchRides
const styles = StyleSheet.create({
    pageContainer:{
       
        alignItems:'center',
        flex:1,
       
        
    },
    headerContainer: {
      
      alignItems: 'center',
      
      marginTop:60 
      
    },
    headerText: {
      fontSize: 24, 
      color: '#00669B', // Text color that contrasts with the background
      fontWeight: 'bold', // Bold text
    },
})