import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  Dimensions,
  View,
  Image,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/Ionicons";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";

function OnBoarding({navigation}) {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const _carousel = useRef();
  const data = [
    { id: 2, image: image1 },
    { id: 3, image: image2 },
    { id: 4, image: image3 },
    { id: 5, image: image4 },
    { id: 6, image: image5 },
    { id: 7, image: image6 },
    { id: 8, image: image7 },
    { id: 9, image: image8 },
  ];

  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{
            height: Dimensions.get("window").height * 0.8,
            width: Dimensions.get("window").width * 1,
            resizeMode: "contain",
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          alignItems: "flex-end",
          padding: 15,
        }}
      >
        <Button title="Skip" onPress={() => navigation.navigate('Login')}/>
      </View>
      <Carousel
        ref={_carousel}
        data={data}
        renderItem={_renderItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pagination
          carouselRef={_carousel}
          activeDotIndex={activeDotIndex}
          dotsLength={data.length}
          dotStyle={{
            width: 15,
            backgroundColor: "blue",
          }}
          inactiveDotStyle={{
            width: 10,
            backgroundColor: "gray",
          }}
        />
        <View
          style={{
            padding: 15,
            flexDirection: "row",
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              _carousel.current.snapToItem(activeDotIndex - 1);
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: "lightgray",
                marginEnd: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="arrow-back" size={30} color="black" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              if (activeDotIndex + 1 < data.length) {
                _carousel.current.snapToItem(activeDotIndex + 1);
              } else {
                navigation.navigate("Login"); 
              }
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: "blue",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="arrow-forward" size={30} color="white" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default OnBoarding;
