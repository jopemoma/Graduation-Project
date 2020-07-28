import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListEvents from '../ListEvents';
import Event from '../Event';

export default function StackListEvents() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="StackListEvents">
        { (props) => <ListEvents {...props} type="long" /> }
      </Stack.Screen>
      <Stack.Screen name="Event" component={Event} options={{ title: 'Detaljer', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  );
}
