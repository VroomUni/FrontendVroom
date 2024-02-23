import React ,{useState}from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProvideRides from "../screens/ProvideRides";
import DriverRides from "../screens/DriverRides";
import HistoryDriver from "../screens/HistoryDriver";
import Profile from "../screens/Profile";
import SearchRides from "../screens/SearchRides";
import PassengerRides from "../screens/PassengerRides";


const Tab = createBottomTabNavigator();

function TabNav() {

  const [userType, setUserType] = useState('passenger');
  return (
    <Tab.Navigator
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Provide Rides' && userType === 'driver') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Search Rides' && userType === 'passenger') {
            iconName = focused ? 'magnify' : 'magnify'; // Change icon for search rides
          } else if (route.name === 'My Rides') {
            iconName = focused ? 'calendar-check' : 'calendar-check-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'clock-time-eight' : 'clock-time-eight-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }

     
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#168FE0', 
        },
        headerShown: false,
      })}>
         {userType === 'driver' ? (
          <>
            <Tab.Screen name="Provide Rides" component={ProvideRides}/>
            <Tab.Screen name="My Rides" component={DriverRides}/>
          </>
        ) : (
          <>
          <Tab.Screen name="Search Rides" component={SearchRides}/>
          <Tab.Screen name="My Rides" component={PassengerRides}/>
          </>
        )}
        <Tab.Screen name="History" component={HistoryDriver}/>
        <Tab.Screen name="Profile" component={Profile}/>
      </Tab.Navigator>
  );
}

export default TabNav;
