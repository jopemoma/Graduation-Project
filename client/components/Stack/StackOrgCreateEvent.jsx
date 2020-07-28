import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateEvent from '../CreateEvent';
import Event from '../Event';

export default function StackOrgCreateEvent() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateEvent" component={CreateEvent} options={{ title : 'Planlegg Arrangement', headerTitleAlign: 'center' }} />
      <Stack.Screen name="Event" component={Event} options={{ title: 'Detaljer', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  );
}
