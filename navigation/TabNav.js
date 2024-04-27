import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DriverRides from "../screens/driver/DriverRides";
import HistoryDriver from "../screens/driver/HistoryDriver";
import PassengerRides from "../screens/passenger/PassengerRides";
import { Alert, Platform, TouchableOpacity, View } from "react-native";
import RideInfoInput from "../screens/RideInfoInput";
import { useAuth } from "../context/AuthContext";
// import EditProfileStack from "./EditProfileStack";
import PassengerSearchRidesStack from "./PassengerSearchRideStack";
import DetailsNav from "./DetailsNav";
import DriverRequestNav from "./DriverRequestNav";
import ProfileDrawer from "./ProfileDrawer";

const Tab = createBottomTabNavigator();
function TabNav() {
  const { isPassenger, setIsPassenger } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Provide Rides" && !isPassenger) {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "Search Rides" && isPassenger) {
            iconName = focused ? "magnify" : "magnify";
          } else if (route.name === "My Rides") {
            iconName = focused ? "calendar-check" : "calendar-check-outline";
          } else if (route.name === "History") {
            iconName = focused
              ? "clock-time-eight"
              : "clock-time-eight-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account-circle" : "account-circle-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "#162447",
        tabBarInactiveTintColor: "#CCCCCC",
        tabBarStyle: {
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5, // Add elevation for Android
        },
        headerShown: false,
      })}>
      {!isPassenger ? (
        <>
          <Tab.Screen name='Provide Rides' component={RideInfoInput} />
          <Tab.Screen name='My Rides' component={DriverRequestNav} />
        </>
      ) : (
        <>
          <Tab.Screen
            name='Search Rides'
            component={PassengerSearchRidesStack}
          />
          <Tab.Screen name='My Rides' component={PassengerRides} />
        </>
      )}
      <Tab.Screen
        name='test'
        component={RideInfoInput}
        options={{
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                Alert.alert(
                  `switch from ${isPassenger ? "passenger" : "driver"}`,
                  `Are you sure you want to switch from ${
                    isPassenger ? "passenger" : "driver"
                  } to ${!isPassenger ? "passenger" : "driver"}?`,
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Switch",
                      onPress: () => setIsPassenger(!isPassenger),
                    },
                  ]
                );
              }}>
              <View
                style={{
                  top: Platform.OS == "ios" ? -15 : -20,
                  width: Platform.OS == "ios" ? 50 : 60,
                  height: Platform.OS == "ios" ? 50 : 60,
                  borderRadius: Platform.OS == " ios" ? 25 : 30,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#162447",
                }}>
                <FontAwesome name='exchange' size={24} color='#fff' />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen name='History' component={DetailsNav} />
      <Tab.Screen name='Profile' component={ProfileDrawer} />
    </Tab.Navigator>
  );
}

export default TabNav;
