/* eslint-disable react/jsx-props-no-spreading */
import React from '../../node_modules/react';
import { createStackNavigator } from '../../node_modules/@react-navigation/stack';
import Event from '../common/events/Event';
import ListEvents from '../common/events/ListEvents';
import ListVolunteers from '../organization/ListVolunteers';
import Profile from '../user/Profile';

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
