import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Event from '../common/events/Event';
import MyEvents from '../user/MyEvents';

export default function StackMyEvents() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#C2E7D9',
      },
      headerTintColor: '#0F084B',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    >
      <Stack.Screen name="MyEvents" component={MyEvents} options={{ title: 'Mine påmeldinger', headerTitleAlign: 'center' }} />
      <Stack.Screen name="Event" component={Event} options={{ title: 'Detaljer', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  );
}
