import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Event from '../common/events/Event';
import CreateEvent from '../organization/CreateEvent';

export default function StackOrgCreateEvent() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#143642',
      },
      headerTintColor: '#C2E7D9',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    >
      <Stack.Screen name="CreateEvent" component={CreateEvent} options={{ title: 'Planlegg Arrangement', headerTitleAlign: 'center' }} />
      <Stack.Screen name="Event" component={Event} options={{ title: 'Detaljer', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  );
}
