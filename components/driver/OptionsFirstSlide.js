import React, { useState } from "react";
import { View, SafeAreaView , StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Surface, Text, SegmentedButtons, Button } from "react-native-paper";
import { useDriverContext } from "../context/DriverContext";
const OptionsFirstSlide = ({ goToSlide }) => {
  const {
    btnGrpDateValue,
    setDateValue,
    setCustomSelectedTime,
    customSelectedTime,
  } = useDriverContext();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [customSelectedDate, setCustomSelectedDate] = useState(null);

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
        setCustomSelectedDate(selectedDate);
      } else if (isTimePickerVisible) {
        setTimePickerVisible(false);
        setCustomSelectedTime(selectedDate);
        goToSlide(1);
      }
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
          {customSelectedTime
            ? customSelectedTime.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Pick"}
        </Button>
      </View>
      {/* date picker */}
      {isDatePickerVisible && (
        <DateTimePicker
          value={customSelectedDate || new Date()}
          mode='date'
          display='default'
          onChange={handleDateTimeChange}
        />
      )}
      {/* time Picker */}
      {isTimePickerVisible && (
        <DateTimePicker
          value={customSelectedTime || new Date()}
          mode='time'
          display='default'
          onChange={handleDateTimeChange}
        />
      )}
    </Surface>
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
    rowGap: 50,
    margin: 20,
  },
});
export default OptionsFirstSlide;
