import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Event from '../Common/Event';
import ListEvents from '../Common/ListEvents';
import ListVolunteers from '../Organization/ListVolunteers';
import Profile from '../User/Profile';


export default function StackOrgListEvents() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListEvents" options={{ title: 'Dine Arrangementer', headerTitleAlign: 'center' }}>
        { (props) => <ListEvents {...props} type="short" /> }
      </Stack.Screen>
      <Stack.Screen name="ListVolunteers" options={{ title: 'Søkere', headerTitleAlign: 'center' }}>
        { (props) => <ListVolunteers {...props} type="short" /> }
      </Stack.Screen>
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Søkers Profil', headerTitleAlign: 'center' }} />
      <Stack.Screen name="Event" component={Event} options={{ title: 'Detaljer', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  );
}
