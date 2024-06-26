import React from "react";
import SplashScreen from "./screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "./screens/LoadingScreen";
import OnBoarding from "./screens/OnBoarding";
import TabNav from "./navigation/TabNav";
import Home from "./screens/Home";
import Signup from "./screens/SignUp";
import Signup2 from "./screens/SignUp-2";
import Login from "./screens/Login";
import Preferences from "./screens/Preferences";
import Car from "./screens/Car";
import { AuthContextProvider, useAuth } from "./context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CarSettings from "./components/CarSettings";
function App() {
  const Stack = createStackNavigator();
  const { user } = useAuth();
  console.log("user ", user?.email);

  return (
    // <PassengerSearchRides />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Preferences' component={Preferences} />
        <Stack.Screen name='TabNav' component={TabNav} />
        <Stack.Screen name='Car' component={Car} />
        <Stack.Screen name='OnBoarding' component={OnBoarding} />
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Login' component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppWrapper() {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </AuthContextProvider>
  );
}
