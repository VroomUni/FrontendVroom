import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DriverRides from '../screens/driver/DriverRides';
import RideCardDetails from '../components/driver/RideCardDetails';
import PassengerRequestCard from '../components/driver/PassengerRequestCard';

const DriverStack = createStackNavigator();

function DriverRequestNav() {
  return (
 <DriverStack.Navigator>
    <DriverStack.Screen name='requests' component={DriverRides}  options={{ headerShown: false }}/>
    <DriverStack.Screen name='requestDetails' component={RideCardDetails} options={{ 
      headerTransparent: true, // make header transparent
      headerTitle: '',
    }}  />
 </DriverStack.Navigator>
  )
}

export default DriverRequestNav