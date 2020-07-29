import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Event from '../Common/Event';
import MyEvents from '../User/MyEvents';

export default function StackMyEvents() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#D62246',
      },
      headerTintColor: '#fff',
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
