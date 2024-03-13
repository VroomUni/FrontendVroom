import { View,Text,StyleSheet} from 'react-native'
import React from 'react'
import DriverDate from '../components/DriverDate';
import RideCard from '../components/RideCard';
import RideCardDetails from '../components/RideCardDetails';
import RideCardList from '../components/RideCardList';

function DriverRides() {
  return (
    <View style={styles.container}>
         <DriverDate/>
         <RideCardList/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

export default DriverRides
