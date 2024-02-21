import React, { useRef, useState } from 'react'
import { SafeAreaView, Text, Dimensions, View, Image, Button, TouchableWithoutFeedback } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import IMAGES from '../assets';

function OnBoarding() {
  const [activeDotIndex, setActiveDotIndex] = useState(0)
  const _carousel = useRef()
const data = [
 {id: 2, 
 title: " Find Rides",
 image: IMAGES.ACCESS, 
 description:  [
  "- Start by creating your Account",
  "- Set your preferences for pickup and drop-off locations\n",
  "- Find rides effortlessly by swiping through potential matches\n",
  "-You'll get notified when you're request is accepted."
]
},

{id: 2, title:" Offer Rides",image: IMAGES.ACCESS, description:  [
  "- Start by creating your Account\n",
  "- Set your departure time, pickup location, and destination\n",
  "- Offer rides to fellow students\n",
]},
{id:3, title:" Match Requests",image: IMAGES.ENJOY,description:  [
  "-Receive match requests from passenger who are heading in your direction.\n",
  "- You have the choice to accept, or decline.\n",
  "- You can keep track of all your rides through our interface",
]},
{id:4, title:"Dynamic Matching",image: IMAGES.ENJOY,description:  [
  "-Our dynamic matching algorithm finds the best matches for you.\n",
  "- Factors like proximity, schedules, and preferences are taken into account\n",
  "-Sit back and let us find your perfect match!",
]},
];

 const _renderItem = ({item, index}) => {
    return (
        <View>
          <Image source={item.image} style={{
            height:Dimensions.get('window').width,
            width:Dimensions.get('window').width
          }}/>
          <View style={{padding:15}}>
           <Text style={{
            fontSize: 18,
          fontWeight:'700'}}>
            { item.title }</Text>
            <Text style={{
            marginTop:20,
            fontSize:16}}>
            { item.description }</Text>
        </View>
        </View>
      
           
       
    );
}


  return (
   <SafeAreaView style={{
    flex:1,
    justifyContent:'space-between'
   }}>
    <View style={{
      alignItems:'flex-end',
      padding:15}}>
      <Button title="Skip"/>
    </View>
    <Carousel
    ref={_carousel}
      data={data}

      renderItem={_renderItem}
      sliderWidth={Dimensions.get("window").width}
      itemWidth={Dimensions.get("window").width}
      onSnapToItem={index=> setActiveDotIndex(index)}
    
    />
    <View style={{
      flexDirection:'row',
      justifyContent:'space-between'
    }}>
      <Pagination carouselRef={_carousel} activeDotIndex={activeDotIndex} dotsLength={4} dotStyle={{ 
        width:15,
        backgroundColor:"blue"
        }}
        inactiveDotStyle={{
          width:10,
          backgroundColor:'gray'
        }}/>
     
      <View style={{
        padding:15,
        flexDirection:'row'
      }}>
         <TouchableWithoutFeedback onPress={()=>{
          _carousel.current.snapToItem(activeDotIndex - 1)
         }
        }>
         <View style={{
          height:50,
          width:50, 
          borderRadius:25,
          backgroundColor:"lightgray",
          marginEnd:10
        }}/>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{
          _carousel.current.snapToItem(activeDotIndex+1)
        }}>
        <View style={{
          height:50,
          width:50, 
          borderRadius:25,
          backgroundColor:"blue"
        }}/>
        </TouchableWithoutFeedback>
      </View>
    </View>
   </SafeAreaView>
  )
}

export default OnBoarding
