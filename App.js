import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen';
import OnBoarding from './screens/OnBoarding';
import TabNav from './navigation/TabNav';
import Home from './screens/Home';
import DriverRideLocationInput from './screens/DriverRideLocationInput';



export default function App() {
  const Stack = createStackNavigator();
  return (
   
    <NavigationContainer>
      <Stack.Navigator 
      // initialRouteName="LoadingScreen"
       headerMode="none"
       >
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name='OnBoarding'   component={OnBoarding}/>
        {/* <Stack.Screen name="TabNav" component={TabNav} />
        <Stack.Screen name="DriverRideLocationInput" component={DriverRideLocationInput} /> */}



      </Stack.Navigator>

    </NavigationContainer>
    

  );
}
//fix map curent location 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
