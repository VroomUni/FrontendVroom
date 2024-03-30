import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Surface, Text, SegmentedButtons, Button } from "react-native-paper";
import { useRideContext } from "../../context/UserRideContext";
import { useAuth } from "../../context/AuthContext";
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
  const handleDateTimeChange = (event, selectedDateOrTime) => {
    setFromTimePickerVisible(false);

    if (!selectedDateOrTime) return;

    if (isDatePickerVisible) {
      setDatePickerVisibility(false);
      if (event.type === "set") {
        setCustomSelectedDate(selectedDateOrTime);
      }
      //if date picking is canceled then set it back to today
      if (event.type !== "set"&&!customSelectedDate) {
        setDateValue("today");
      }
      if (!customSelectedFromTime) setFromTimePickerVisible(true);
      return;
    }
//MUST FIX ONE HOUR DIFFERENCE IN DATETIMEPICKER
    if (isFromTimePickrVisible) {
      const currentTime = new Date();
      // console.log("Changed",selectedDateOrTime);
      // console.log("CURRENT" ,currentTime);

      if (selectedDateOrTime < currentTime&&btnGrpDateValue==="today") {
        Alert.alert(
          "Please pick a valid time after",
          timeTo24Format(currentTime)
        );
        return;
      }

      if (event.type === "set") {
        setCustomSelectedTime(selectedDateOrTime);
        goToSlide &&
          setTimeout(() => {
            goToSlide(1);
          }, 200);
      }
    }
  };

  //handles only ToTime for passenger searching ride with time interval
  const handleToTimeChange = (event, toTime) => {
    setToTimePickerVisible(false);

    if (!toTime) return;

    if (toTime < customSelectedFromTime) {
      Alert.alert(
        "Please pick a valid time after",
        timeTo24Format(customSelectedFromTime)
      );
      return;
    }

    if (event.type === "set") {
      setCustomToTime(toTime);
    }
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
  const timeTo24Format = time =>
    time.getHours().toString().padStart(2, "0") +
    ":" +
    time.getMinutes().toString().padStart(2, "0");
  const commonStyles = StyleSheet.create({
    //inner container for slider content , the one with white background
    innerSliderContainer: {
      borderRadius: 7,
      padding: 15,
      backgroundColor: "#F4F4FB",
      borderWidth: 1,
      borderColor: "black",
      flex: 1,
      rowGap: isPassenger && customSelectedFromTime ? 30 : 50,
      margin: 20,
      width: "90%",
    },
  });

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
      {isDatePickerVisible && (
        <DateTimePicker
          value={customSelectedDate || new Date()}
          mode='date'
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateTimeChange}
          maximumDate={new Date().setDate(new Date().getDate() + 7)}
          minimumDate={new Date()}
        />
      )}
      {/* from time Picker for passenger and driver */}
      {isFromTimePickrVisible && (
        <DateTimePicker
          is24Hour
          value={
            customSelectedFromTime ||
            new Date(new Date().getTime() + 60 * 60 * 1000)
          }
          mode='time'
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateTimeChange}
        />
      )}

      {/*to time Picker  , only for passenger */}
      {isToTimePickrVisible && (
        <DateTimePicker
          is24Hour
          value={
            customSelectedToTime ||
            new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
          }
          mode='time'
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleToTimeChange}
        />
      )}
    </Surface>
  );
};

export default OptionsFirstSlide;
