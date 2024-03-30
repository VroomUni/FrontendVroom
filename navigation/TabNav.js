import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DriverRides from "../screens/DriverRides";
import HistoryDriver from "../screens/HistoryDriver";
import Profile from "../screens/Profile";
import SearchRides from "../screens/SearchRides";
import PassengerRides from "../screens/PassengerRides";
import { Alert, Platform, TouchableOpacity, View } from "react-native";
import DiverProvideRide from "../screens/DriverProvideRide";
import EditNav from "./EditNav";
import DetailsNav from "./DetailsNav";

const Tab = createBottomTabNavigator();

function TabNav({route}) {
  const [userType, setUserType] = useState(route.params.user);
  console.log(userType)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Provide Rides" && userType === "driver") {
            iconName = focused ? "car" : "car-outline";
          } else if (
            route.name === "Search Rides" &&
            userType === "passenger"
          ) {
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
        tabBarActiveTintColor: "#00669B",
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
      {userType === "driver" ? (
        <>
          <Tab.Screen name='Provide Rides' component={DiverProvideRide} />
          <Tab.Screen name='My Rides' component={DriverRides} />
          
        </>
      ) : (
        <>
          <Tab.Screen name='Search Rides' component={SearchRides} />
          <Tab.Screen name='My Rides' component={PassengerRides} />
        </>
      )}
      <Tab.Screen
        name='test'
        component={userType === "driver" ? DiverProvideRide : SearchRides}
        options={{
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                Alert.alert(
                  `switch from ${userType}`,
                  `Are you sure you want to switch from ${userType} to ${
                    userType === "driver" ? "passenger" : "driver"
                  }?`,
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Switch",
                      onPress: () =>
                        setUserType(
                          userType === "driver" ? "passenger" : "driver"
                        ),
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


      <Tab.Screen name='History'>
        {() => <DetailsNav userType={userType} />}
      </Tab.Screen>

      <Tab.Screen name='Profile' component={EditNav} />
      
     

     


    </Tab.Navigator>
  );
}

export default TabNav;
