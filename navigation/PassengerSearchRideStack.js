import { createStackNavigator } from "@react-navigation/stack";
import PassengerSearchRides from "../screens/passenger/PassengerSearchRides";
import RideOnMap from "../screens/passenger/RideOnMap";
import RideInfoInput from "../screens/RideInfoInput";

const Stack = createStackNavigator();

function PassengerSearchRidesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Ride information'
        component={RideInfoInput}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Rides' component={PassengerSearchRides} />
      <Stack.Screen name='Map' component={RideOnMap} />
    </Stack.Navigator>
  );
}

export default PassengerSearchRidesStack;
