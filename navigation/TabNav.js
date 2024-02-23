import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ProvideRides from "../screens/ProvideRides";
import DriverRides from "../screens/DriverRides";
import HistoryDriver from "../screens/HistoryDriver";
import Profile from "../screens/Profile";
import SearchRides from "../screens/SearchRides";
import PassengerRides from "../screens/PassengerRides";
import { Alert, Platform, TouchableOpacity, View } from "react-native";

const Tab = createBottomTabNavigator();

function TabNav() {
  const [userType, setUserType] = useState("passenger");
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
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#168FE0",
        },
        headerShown: false,
      })}
    >
      {userType === "driver" ? (
        <>
          <Tab.Screen name="Provide Rides" component={ProvideRides} />
          <Tab.Screen name="My Rides" component={DriverRides} />
        </>
      ) : (
        <>
          <Tab.Screen name="Search Rides" component={SearchRides} />
          <Tab.Screen name="My Rides" component={PassengerRides} />
        </>
      )}
      <Tab.Screen
        name="test"
        component={userType === "driver" ? ProvideRides : SearchRides}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                Alert.alert(
                  `switch from ${userType}`,
                  `Are you sure you want to switch from ${userType} to ${userType === 'driver' ? 'passenger' : 'driver'}?`,
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
              }}
            >
              <View
                style={{
                  top: Platform.OS == "ios" ? -15 : -20,
                  width: Platform.OS == "ios" ? 50 : 60,
                  height: Platform.OS == "ios" ? 50 : 60,
                  borderRadius: Platform.OS == " ios" ? 25 : 30,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#162447",
                }}
              >
                <FontAwesome name="exchange" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="History" component={HistoryDriver} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default TabNav;
