import React,{useState, useRef} from 'react'
import DriverCard from '../../components/DriverCard'
import { StyleSheet, View,Text,Animated ,Image } from 'react-native'
import Swiper from "react-native-deck-swiper";
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';


const driversData = [
    {
      id: 1,
      firstName: "Ahmed",
      lastName:"Jouni",
      rating: 4,
      smoking:"no",
      Talkative:"light chitchat",
      eating:"no",
      musicGenre :"loud music",
      time: "17:30",
      departure: "Mannouba",
      destination:"SMU",
      imageUri: 'https://bootdey.com/img/Content/avatar/avatar1.png'
    },
    {
      id: 2,
      firstName: "Laila",
      lastName:"Mahmoud",
      rating: 5,
      smoking:"yes",
      Talkative:"quiet",
      eating:"yes",
      musicGenre:"calm music",
      time: "18:00",
      departure: "Carthage",
      destination:"SMU",
      imageUri: 'https://bootdey.com/img/Content/avatar/avatar2.png'
    },
    {
      id: 3,
      firstName: "Sami",
      lastName:"Rayan",
      rating: 3,
      smoking:"yes",
      Talkative:"chatty",
      eating:"no",
      musicGenre:"Pop Music",
      time: "19:45",
      departure: "SMU",
      destination:"Marsa",
      imageUri: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      route:{
        encodedPath:"encodedPolylineStringForAhmed",
      
      }
    },
  ];
  const passengerPreferences = {
    smoking: "no",
    Talkative: "light chitchat",
    eating: "no",
    musicGenre: "calm music"
  };

function SearchRides() {
  const [showRequestSent, setShowRequestSent] = useState(false);
  const [allCardsSwiped, setAllCardsSwiped] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current; 

  const onSwipedLeft = (cardIndex) => {
    console.log('Swiped left, no request sent for: ', driversData[cardIndex]);
    // Handle the 'no request' logic here
  };

  const onSwipedRight = (cardIndex) => {
    console.log('Swiped right, request sent for: ', driversData[cardIndex]);
    // Send the request to the driver here and show feedback

    setShowRequestSent(true);
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 500, // 500ms
      useNativeDriver: true // Add this line
    }).start(() => {
      // After the animation completes, start fading out the message
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0, // Fully transparent
          duration: 500, // 500ms
          useNativeDriver: true // Add this line
        }).start(() => setShowRequestSent(false)); 
         
      }, 1000); // Message stays visible for 1 second
    });
  };
  const onSwipedAll = () => {
    setAllCardsSwiped(true);
   
  };
  const resetCards = () => {
    setAllCardsSwiped(false);
    // Additional logic if needed, like resetting filters or fetching new data
  }
  return (
    <View style={styles.pageContainer}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Swipe Your Way</Text>
      
    </View>
    <Swiper
      cards={driversData}
      renderCard={(card) => <DriverCard driver={card} passengerPreferences={passengerPreferences} />}
      onSwipedLeft={onSwipedLeft}
      onSwipedRight={onSwipedRight}
      onSwipedAll={onSwipedAll}
      cardIndex={0}
      backgroundColor={'transparent'}
      stackSize={2}
      cardVerticalMargin={50}
      containerStyle={styles.swiperContainer}
      animateOverlayLabelsOpacity
      animateCardOpacity
      swipeBackCard
    />
     {showRequestSent && (
        <Animated.View style={[styles.requestSentBanner, {opacity: fadeAnim}]}>
          <Text style={styles.requestSentText}>Request Sent!</Text>
        </Animated.View>
      )}
     {allCardsSwiped ? (
        <View style={styles.allCardsSwipedContainer}>
          <Image style={styles.NoSuggestionImage} source={require("../../assets/noMoreFilter.png")}/>
          <Text style={styles.allCardsSwipedText}>No more filtered suggestions</Text>
          <Button style={styles.showAllButton} mode="contained" onPress={resetCards}>
            Show All
          </Button>
        </View>
      ) : (
        <View style={styles.animationContainer}>
          <LottieView  style={styles.animation} source={require('../../assets/SwipeAnimation.json')} autoPlay loop />
        </View>
      )}
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
   
    backgroundColor:"#2c3e50",
    width: '100%',
  },

  headerText: {
    marginTop:50,
    fontSize: 28,
    color: '#e8f4f8',
    textAlign: 'center', 
    paddingBottom:10
  },
  subHeaderText: {
    fontSize: 18,
    color: '#e8f4f8',
    textAlign: 'center', 
  
  },
  swiperContainer: {
    flexGrow: 1, 
    justifyContent: 'center', 
  },

  animationContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end', 
    alignItems: 'flex-end',
    marginTop:"100%",
  },
 
  animation: {
    width: '50%',
    height: '50%',
    
  },

  requestSentBanner: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },

  requestSentText: {
    color: 'white',
    fontWeight: 'bold',
  },
  allCardsSwipedContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },

  showAllButton: {
    marginTop: 20, 
    backgroundColor: '#162447',
    borderRadius: 15, 
  },

  allCardsSwipedText:{
    fontSize:20
  },
  NoSuggestionImage: {
    width: "150%", 
    height:"50%", 
    resizeMode: 'contain', 
    marginBottom:5
  },
 
})