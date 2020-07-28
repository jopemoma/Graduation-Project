import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Event from '../Event';
import MyEvents from '../MyEvents';

export default function StackMyEvents() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyEvents" component={MyEvents} />
      <Stack.Screen name="Event" component={Event} options={{ title: 'Detaljer Brage', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  );
}
