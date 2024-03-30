import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HistoryDriver from "../screens/driver/HistoryDriver";
import SeeDetails from "../components/driver/SeeDetails";
import HistoryPassenger from "../screens/HistoryPassenger";
import { useAuth } from "../context/AuthContext";

const DetailsStack = createStackNavigator();

function DetailsNav() {
  const { isPassenger } = useAuth();
  return (
    <DetailsStack.Navigator>
      {isPassenger ? (
        <DetailsStack.Screen
          name='HistoryPassenger'
          component={HistoryPassenger}
        />
      ) : (
        <DetailsStack.Screen name='HistoryDriver' component={HistoryDriver} />
      )}
      <DetailsStack.Screen name='Passengers' component={SeeDetails} />
    </DetailsStack.Navigator>
  );
}

export default DetailsNav;
