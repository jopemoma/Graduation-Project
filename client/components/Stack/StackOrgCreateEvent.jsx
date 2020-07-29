import React from '../../node_modules/react';
import { createStackNavigator } from '../../node_modules/@react-navigation/stack';
import Event from '../common/events/Event';
import CreateEvent from '../organization/CreateEvent';

export default function StackOrgCreateEvent() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateEvent" component={CreateEvent} options={{ title: 'Planlegg Arrangement', headerTitleAlign: 'center' }} />
      <Stack.Screen name="Event" component={Event} options={{ title: 'Detaljer', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  );
}
