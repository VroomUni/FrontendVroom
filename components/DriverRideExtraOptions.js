import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Surface, Text, SegmentedButtons, Button } from "react-native-paper";
import CounterInput from "react-native-counter-input";

const FirstSlide = ({ goToSlide }) => {
  const [btnGrpValue, setValue] = React.useState("today");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const handleDateTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      if (isDatePickerVisible) {
        setDatePickerVisibility(false);
        setSelectedDate(selectedDate);
      } else if (isTimePickerVisible) {
        setTimePickerVisible(false);
        setSelectedTime(selectedDate);
        goToSlide(1);
      }
    }
  };
  //today , tmrw  , date btn grp
  const renderBtnGrp = () => {
    return (
      <SafeAreaView style={{ alignItems: "center" }}>
        <SegmentedButtons
          value={btnGrpValue}
          onValueChange={val => {
            if (val === "date") {
              showDatePicker();
            }

            setValue(val);
          }}
          style={{ width: "90%" }}
          density='small
        '
          buttons={[
            {
              value: "today",
              label: "Today",
              checkedColor: "grey",
              uncheckedColor: "black",
              labelStyle: "black",
              icon: btnGrpValue === "today" && "check",
            },
            {
              value: "tomorrow",
              label: "Tomorrow",
              checkedColor: "grey",
              uncheckedColor: "black",
              icon: btnGrpValue === "tomorrow" && "check",
            },
            {
              value: "date",
              icon: "calendar",
              label: selectedDate?.toLocaleDateString(undefined, {
                day: "numeric",
                month: "numeric",
              }),
              checkedColor: "grey",
              uncheckedColor: "black",
              // style: { borderRadius: 15 },
            },
          ]}
        />
      </SafeAreaView>
    );
  };
  return (
    <Surface style={styles.innerSliderContainer}>
      {/* tday , tmrw , data Bttn group */}
      {renderBtnGrp()}

      {/* View for Time and button to pick Time */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 20,
          justifyContent: "space-around",
        }}>
        <Text variant='titleMedium'> Time:</Text>
        {/* pick Time btn */}
        <Button
          mode='outlined'
          style={{
            borderRadius: 10,
          }}
          textColor='black'
          icon={"clock-time-eight"}
          onPress={showTimePicker}>
          {selectedTime
            ? selectedTime.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Pick"}
        </Button>
      </View>
      {/* date picker */}
      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode='date'
          display='default'
          onChange={handleDateTimeChange}
        />
      )}
      {/* time Picker */}
      {isTimePickerVisible && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode='time'
          display='default'
          onChange={handleDateTimeChange}
        />
      )}
    </Surface>
  );
};

const SecondSlide = () => (
  <View style={styles.innerSliderContainer}>
    <Button mode='outlined' icon={"seat-passenger"}>
      Spots
    </Button>
    <CounterInput
      min={1}
      max={4}
      initial={4}
      horizontal
      reverseCounterButtons
      increaseButtonBackgroundColor='#96DDF4'
      decreaseButtonBackgroundColor='#96DDF4'
      style={{ width: "40%" }}
    />
  </View>
);

const DriverRideExtraOptions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = React.createRef();

  const goToSlide = index => {
    carouselRef.current.snapToItem(index);
  };

  const renderPagination = () => (
    <Pagination
      dotsLength={2} // Number of your divs
      activeDotIndex={activeIndex}
      containerStyle={styles.paginationContainer}
      dotStyle={styles.paginationDot}
      inactiveDotStyle={styles.paginationDot}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        data={[{}, {}]} // Dummy data to create two slides
        renderItem={({ index }) =>
          index === 0 ? <FirstSlide goToSlide={goToSlide} /> : <SecondSlide />
        }
        sliderWidth={420}
        itemWidth={420}
        onSnapToItem={index => setActiveIndex(index)}
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    backgroundColor: "#96DDF4",
    overflow: "hidden",
    alignItems: "center",
    flex: 3.5,
  },

  innerSliderContainer: {
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#F4F4FB",
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
    rowGap: 40,
    margin: 20,
  },

  // related to the dots pagination no need to edit 
  paginationContainer: {
    position: "absolute",
    bottom: 20,
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
