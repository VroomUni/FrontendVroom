import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Surface,
  Text,
  SegmentedButtons,
  Button,
  Icon,
  Chip,
  IconButton,
  Checkbox,
} from "react-native-paper";

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
    <Surface style={commonStyles.innerSliderContainer}>
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

const SecondSlide = () => {
  const [spotsCount, setSpotsCount] = useState(4);
  const [isRecurernceModalVisible, setRecurrenceModalVisible] = useState(false);
  const handleSpotsCountChange = increment => {
    // Ensure spotsCount stays within the interval of 1 to 4
    const newCount = Math.min(Math.max(spotsCount + increment, 1), 4);
    setSpotsCount(newCount);
  };

  const renderCounter = () => (
    <View style={slide2Style.spotsCounterContainer}>
      <IconButton
        icon='minus'
        style={slide2Style.sptCounterIconBtn}
        onPress={() => handleSpotsCountChange(-1)}
      />

      <Text style={{ fontSize: 18 }}>{spotsCount}</Text>

      <IconButton
        icon='plus'
        style={slide2Style.sptCounterIconBtn}
        onPress={() => handleSpotsCountChange(1)}
      />
    </View>
  );
  const renderRecurrenceModal = () => {
    const [days, setDays] = useState({
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    });

    const toggleDay = day => {
      setDays(prevDays => ({
        ...prevDays,
        [day]: !prevDays[day],
      }));
    };

    const handleSave = () => {
      // Close the modal
      setRecurrenceModalVisible(false);
    };

    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={isRecurernceModalVisible}
        onRequestClose={() => {
          setRecurrenceModalVisible(false);
        }}>
        <View style={slide2Style.repeatModalContainer}>
          <View style={slide2Style.repeatModalContent}>
            <Text style={slide2Style.repeatModalTitle}>Repeat</Text>
            <View style={slide2Style.checkboxContainer}>
              {Object.keys(days).map(day => (
                <View key={day} style={slide2Style.checkboxItem}>
                  <Checkbox.Item
                    value={days[day]}
                    status={days[day] ? "checked" : "unchecked"}
                    onPress={() => toggleDay(day)}
                  />
                  <Text>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={slide2Style.saveButton}
              onPress={handleSave}>
              <Text style={slide2Style.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <>
      <View style={[commonStyles.innerSliderContainer, { rowGap: 10 }]}>
        {/* spots and counter view*/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
            justifyContent: "space-around",
            columnGap: 30,
          }}>
          <Chip
            mode='outlined'
            icon={() => (
              <Icon source={"seat-passenger"} color='black' size={20} />
            )}
            showSelectedCheck={false}>
            Spots
          </Chip>
          {renderCounter()}
        </View>

        {/* repeat / only once  container view  */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            columnGap: 25,
          }}>
          <Chip mode='outlined' icon={"repeat"}>
            Repeat
          </Chip>
          <Button
            mode='outlined'
            textColor='black'
            contentStyle={{
              flexDirection: "row-reverse",
              borderColor: "black",
            }}
            style={{ borderRadius: 5, marginRight: 15 }}
            icon={"chevron-right"}
            onPress={() => {
              setRecurrenceModalVisible(true);
            }}>
            Only once
          </Button>
        </View>
      </View>
      {renderRecurrenceModal()}
    </>
  );
};
// 2nd Slide styles
const slide2Style = StyleSheet.create({
  //related to the counter component
  spotsCounterContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  sptCounterIconBtn: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    margin: 20,
    borderWidth: 1,
    borderColor: "#96DDF4",
    borderStyle: "solid",
    borderRadius: 10,
    shadowColor: "#96DDF4",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 5,
  },
  repeatModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  repeatModalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  repeatModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

//carousel of the 2 pages / slides created above
//  This final component is only responsible for swiping between them
const DriverRideExtraOptions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = React.createRef();

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

const commonStyles = StyleSheet.create({
  //outer div for options component
  //  this is the blue div in the scene  .
  carouselContainer: {
    backgroundColor: "#96DDF4",
    overflow: "hidden",
    alignItems: "center",
    flex: 3.5,
  },
  //inner container for slider content , the one with white background
  innerSliderContainer: {
    borderRadius: 7,
    padding: 15,
    backgroundColor: "#F4F4FB",
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
    rowGap: 50,
    margin: 20,
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
