import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

function DriverCalendar({ onDateSelected }) {
  const currentDate = new Date();
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);

  return (
    <View style={styles.container}>
      <CalendarStrip
        style={styles.calendar}
        calendarColor={'#162447'}
        calendarHeaderStyle={{ color: 'white' }}
        dateNumberStyle={{ color: 'white' }}
        dateNameStyle={{ color: 'white' }}
        iconContainer={{ flex: 0.1 }}
        highlightDateNumberStyle={{ color: 'red' }}
        highlightDateNameStyle={{ color: 'red' }}
        selectedDate={currentDate}
        onDateSelected={(date) => onDateSelected(date)}
        startingDate={firstDayOfYear}
        minDate={firstDayOfYear}
        maxDate={currentDate}
        scrollable={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#162447',
    paddingTop: 30,
  },
  calendar: {
    height: 100,
    paddingTop: 10,
  },
});

export default DriverCalendar;
