import React, { StrictMode } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen';
import OnBoarding from './screens/OnBoarding';
import TabNav from './navigation/TabNav';
import Home from './screens/Home';
import Signup from './screens/SignUp';
import Login from './screens/Login';
import Preferences from './screens/Preferences';
import Car from './screens/Car';
import SearchRides from './screens/SearchRides';



export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="LoadingScreen"
       screenOptions={{headerShown:false}}
       
       >
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Preferences" component={Preferences} />
        <Stack.Screen name="OnBoarding" component={OnBoarding}/>
        <Stack.Screen name="Home"  component={Home}/>
        <Stack.Screen name="SearchRides"  component={SearchRides}/>
        <Stack.Screen name="Car"  component={Car}/>
        <Stack.Screen name="TabNav" component={TabNav} />



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
