import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HistoryDriver from "../screens/driver/HistoryDriver";
import SeeDetails from "../components/driver/SeeDetails";
import HistoryPassenger from "../screens/passenger/HistoryPassenger";
import { useAuth } from "../context/AuthContext";

const HistoryStack = createStackNavigator();

function HistoryNav() {
  const { isPassenger } = useAuth();
  return (
    <HistoryStack.Navigator>
      {isPassenger ? (
        <HistoryStack.Screen
          name='HistoryPassenger'
          component={HistoryPassenger}
          options={{ headerShown: false }}
        />
      ) : (
        <HistoryStack.Screen
          name='HistoryDriver'
          component={HistoryDriver}
          options={{ headerShown: false }}
        />
      )}
      <HistoryStack.Screen name='Passengers' component={SeeDetails} />
    </HistoryStack.Navigator>
  );
}

export default HistoryNav;
