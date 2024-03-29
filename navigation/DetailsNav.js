import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryDriver from '../screens/HistoryDriver';
import HistoryPassenger from '../screens/HistoryPassenger'; // Import HistoryPassenger

const DetailsStack = createStackNavigator();

function DetailsNav({ userType }) {
  return (
    <DetailsStack.Navigator>
      {/* Render HistoryDriver for driver */}
      {userType === 'driver' && (
        <DetailsStack.Screen name='HistoryDriver' component={HistoryDriver} />
      )}
      {/* Render HistoryPassenger for passenger */}
      {userType === 'passenger' && (
        <DetailsStack.Screen name='HistoryPassenger' component={HistoryPassenger} />
      )}
    </DetailsStack.Navigator>
  );
}

export default DetailsNav;
