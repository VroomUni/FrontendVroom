import { View,Text,StyleSheet} from 'react-native'
import React from 'react'
import DriverDate from '../components/DriverDate';
import RideCard from '../components/RideCard';

function DriverRides() {
  return (
    <View style={styles.container}>
         <DriverDate/>
         <RideCard/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

export default DriverRides
