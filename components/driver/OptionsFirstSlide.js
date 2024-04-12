import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text, SegmentedButtons, Button } from "react-native-paper";
import { useRideContext } from "../../context/UserRideContext";
import { useAuth } from "../../context/AuthContext";
import { timeTo24Format } from "../../utils/RideHelpers";
const { width, height } = Dimensions.get("window");

const OptionsFirstSlide = ({ goToSlide }) => {
  const {
    btnGrpDateValue,
    setDateValue,
    setCustomSelectedTime,
    customSelectedTime: customSelectedFromTime,
    customSelectedDate,
    setCustomSelectedDate,
    customSelectedToTime,
    setCustomToTime,
  } = useRideContext();

  const { isPassenger } = useAuth();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isFromTimePickrVisible, setFromTimePickerVisible] = useState(false);
  const [isToTimePickrVisible, setToTimePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setFromTimePickerVisible(true);
  };
  //used for both From time and Date
  const handleDateTimeChange = selectedDateOrTime => {
    setFromTimePickerVisible(false);

    if (isDatePickerVisible) {
      setDatePickerVisibility(false);
      setCustomSelectedDate(selectedDateOrTime);

      if (!customSelectedFromTime) setFromTimePickerVisible(true);
      return;
    }
    //MUST FIX ONE HOUR DIFFERENCE IN DATETIMEPICKER
    if (isFromTimePickrVisible) {
      const currentTime = new Date();
      if (selectedDateOrTime < currentTime && btnGrpDateValue === "today") {
        Alert.alert(
          "Please pick a valid time after",
          timeTo24Format(currentTime)
        );
        return;
      }

      setCustomSelectedTime(selectedDateOrTime);
      isPassenger&&setToTimePickerVisible(true);
      goToSlide &&
        setTimeout(() => {
          goToSlide(1);
        }, 200);
    }
  };

  //handles only ToTime for passenger searching ride with time interval
  const handleToTimeChange = toTime => {
    setToTimePickerVisible(false);

    if (toTime < customSelectedFromTime) {
      Alert.alert(
        "Please pick a valid time after",
        timeTo24Format(customSelectedFromTime)
      );
      return;
    }

    setCustomToTime(toTime);
  };

  //today , tmrw  , date btn grp
  const renderBtnGrp = () => {
    return (
      <SafeAreaView style={{ alignItems: "center" }}>
        <SegmentedButtons
          value={btnGrpDateValue}
          onValueChange={val => {
            if (val === "customDate") {
              showDatePicker();
            }

            setDateValue(val);
          }}
          style={{ width: "97%" }}
          density='small
        '
          buttons={[
            {
              value: "today",
              label: "Today",
              checkedColor: "grey",
              uncheckedColor: "black",
              labelStyle: "black",
              icon: btnGrpDateValue === "today" && "check",
            },
            {
              value: "tomorrow",
              label: "Tomorrow",
              checkedColor: "grey",
              uncheckedColor: "black",
              icon: btnGrpDateValue === "tomorrow" && "check",
            },
            {
              value: "customDate",
              icon: "calendar",
              label: customSelectedDate?.toLocaleDateString(undefined, {
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

  const commonStyles = StyleSheet.create({
    //inner container for slider content , the one with white background
    innerSliderContainer: {
      borderRadius: 7,
      padding: 15,
      backgroundColor: "#F4F4FB",
      borderWidth: 1,
      borderColor: "black",
      flex: 1,
      rowGap:
        isPassenger && customSelectedFromTime ? height * 0.035 : height * 0.075,
      margin: 10,
      width: "90%",
      alignSelf: "center",
    },
  });

  return (
    <View style={commonStyles.innerSliderContainer}>
      {/* tday , tmrw , data Bttn group */}
      {renderBtnGrp()}

      {/* View for Time and button to pick Time */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // marginLeft: width*0.01,
          justifyContent: "space-around",
        }}>
        <Text variant='titleMedium'> Time:</Text>
        {/* pick Time btn */}
        <View style={{ rowGap: 10 }}>
          <Button
            contentStyle={{ flexDirection: "row-reverse" }}
            mode='outlined'
            style={{
              borderRadius: 10,
            }}
            textColor='black'
            icon={"clock-time-eight"}
            onPress={showTimePicker}>
            {isPassenger ? "From " : "At "}&nbsp;
            {customSelectedFromTime && timeTo24Format(customSelectedFromTime)}
          </Button>
          {isPassenger && customSelectedFromTime && (
            <Button
              contentStyle={{
                flexDirection: "row-reverse",
                paddingLeft: 10,
                paddingRight: 15,
              }}
              mode='outlined'
              style={{
                borderRadius: 10,
              }}
              textColor='black'
              icon={"clock-time-eight"}
              onPress={() => {
                setToTimePickerVisible(true);
              }}>
              To &nbsp;&nbsp;
              {customSelectedToTime && timeTo24Format(customSelectedToTime)}
            </Button>
          )}
        </View>
      </View>
      {/* date picker for passenger and driver */}
      {isDatePickerVisible&&<DateTimePickerModal
        isVisible={true}
        mode='date'
        date={customSelectedDate || new Date()}
        maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
        minimumDate={new Date()}
        onConfirm={handleDateTimeChange}
        onCancel={() => {
          setDatePickerVisibility(false);
          setDateValue("today");
        }}
      />}
      {/* from time Picker for passenger and driver */}
      {isFromTimePickrVisible&&<DateTimePickerModal
        isVisible={true}
        mode='time'
        is24Hour
        date={
          customSelectedFromTime ||
          new Date(new Date().getTime() + 60 * 60 * 1000)
        }
        onConfirm={handleDateTimeChange}
        onCancel={() => {
          setFromTimePickerVisible(false);
        }}
      />}

      {/* {/*to time Picker  , only for passenger */}
      {isToTimePickrVisible&&<DateTimePickerModal
        isVisible={true}
        mode='time'
        is24Hour
        date={
          customSelectedToTime ||
          new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
        }
        onConfirm={handleToTimeChange}
        onCancel={() => {
          setToTimePickerVisible(false);
        }}
      />}
    </View>
  );
};

export default OptionsFirstSlide;
