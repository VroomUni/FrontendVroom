import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

function DriverDate({onDateSelected}) {
  const currentDate = new Date();
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
      onDateSelected={date=>onDateSelected(date)}
      startingDate={currentDate}
      minDate={currentDate}
      maxDate={new Date(currentDate).setDate(currentDate.getDate()+7)}
      datesBlacklist={(date)=>new Date(date).getDate()<currentDate.getDate()}
      scrollable={true}
      scrollerPaging={true}
      
    />
    
  </View>
  )
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

export default DriverDate
