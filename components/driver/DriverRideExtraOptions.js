import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import OptionsFirstSlide from "./OptionsFirstSlide";
import OptionsSecondSlide from "./OptionsSecondSlide";
import { useAuth } from "../../context/AuthContext";

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

  return (
    <View style={commonStyles.carouselContainer}>
      {/* since component is reused for passenger and driver */}
      {!isPassenger ? (
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
            sliderWidth={420}
            itemWidth={420}
            onSnapToItem={index => setActiveIndex(index)}
          />
          {renderPagination()}
        </>
      ) : (
        <OptionsFirstSlide />
      )}
    </View>
  );
};

const commonStyles = StyleSheet.create({
  //outer div for options component
  //  this is the blue div in the scene  .
  carouselContainer: {
    backgroundColor: "#96DDF4",
    overflow: "hidden",
    alignItems: "center",
    flex: 3.5,
  },

  // related to the dots pagination ( that indicate which slider currently on) , no need to edit
  paginationContainer: {
    position: "absolute",
    bottom: 15,
  },
  paginationDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "black",
  },
});

export default DriverRideExtraOptions;
