import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen';
import OnBoarding from './screens/OnBoarding';
import TabNav from './navigation/TabNav';
import Home from './screens/Home';



export default function App() {
  const Stack = createStackNavigator();
  return (
   
  
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen" headerMode="none">
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name='OnBoarding'   component={OnBoarding}/>
      
      </Stack.Navigator>
    </NavigationContainer>
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
