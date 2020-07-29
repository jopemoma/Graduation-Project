import React from 'react';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import ListEvents from '../ListEvents';
import Event from '../Event';

export default function StackListEvents() {
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
      <Stack.Screen name="ListEvents" options={{ title: 'Arrangementer i nærheten', headerTitleAlign: 'center' }}>
        { (props) => <ListEvents {...props} type="long" /> }
      </Stack.Screen>
      <Stack.Screen name="Event" component={Event} options={{ title: 'Detaljer', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  );
}
