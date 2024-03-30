import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryDriver from '../screens/HistoryDriver';
import SeeDetails from '../components/driver/SeeDetails';
import HistoryPassenger from '../screens/HistoryPassenger';

const DetailsStack = createStackNavigator();

function DetailsNav({ userType }) {
  return (
    <DetailsStack.Navigator>
      {userType === 'passenger' ? (
        <DetailsStack.Screen name='HistoryPassenger' component={HistoryPassenger} />
      ) : (
        <DetailsStack.Screen name='HistoryDriver' component={HistoryDriver} />
      )}
      <DetailsStack.Screen name='Passengers' component={SeeDetails} />
    </DetailsStack.Navigator>
  );
}

export default DetailsNav;
