import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import OptionsFirstSlide from "./OptionsFirstSlide";
import OptionsSecondSlide from "./OptionsSecondSlide";
import { useAuth } from "../../context/AuthContext";

const { width, height } = Dimensions.get("window");

//carousel of the 2 pages / slides
//  This final component is only responsible for swiping between them
const DriverRideExtraOptions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef();
  const { isPassenger } = useAuth();

  //to manually switch a slide
  const goToSlide = index => {
    carouselRef.current.snapToItem(index);
  };
  //related to pagination of slides , no edit
  const renderPagination = () => (
    <Pagination
      dotsLength={2} // Number of divs
      activeDotIndex={activeIndex}
      containerStyle={commonStyles.paginationContainer}
      dotStyle={commonStyles.paginationDot}
      inactiveDotStyle={commonStyles.paginationDot}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );

  return !isPassenger ? (
    <View style={commonStyles.container}>
      {/* since component is reused for passenger and driver */}
      <>
        <Carousel
          ref={carouselRef}
          data={[{}, {}]} // Dummy data to create two slides
          renderItem={({ index }) =>
            index === 0 ? (
              <OptionsFirstSlide goToSlide={goToSlide} />
            ) : (
              <OptionsSecondSlide />
            )
          }
          sliderWidth={width * 0.95}
          itemWidth={width * 0.95}
          onSnapToItem={index => setActiveIndex(index)}
        />
        {renderPagination()}
      </>
    </View>
  ) : (
    <View style={commonStyles.container}>
      <OptionsFirstSlide />
    </View>
  );
};

const commonStyles = StyleSheet.create({
  //outer div for options component
  //  this is the blue div in the scene  .
  container: {
    position: "absolute",
    bottom: height * 0.045,
    alignItems: "center",
    alignSelf: "center",
    width:width*0.95
  },

  // related to the dots pagination ( that indicate which slider currently on) , no need to edit
  paginationContainer: {
    position: "absolute",
    bottom: 0,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "black",
  },
});

export default DriverRideExtraOptions;
