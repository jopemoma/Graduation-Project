import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FBLoginButton from './components/FBLoginButton';
import EventList from './components/EventList';
import Event from './components/Event';
import { AuthContext } from './contexts';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(true);
  const context = {
    isLoggedin,
    setLoggedinStatus,
  };
  return (
    <AuthContext.Provider value={context}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedin ? (
            <>
              <Stack.Screen name="Eventlist" component={EventList} />
              <Stack.Screen name="Event" component={Event} />
            </>
          ) : (
            <Stack.Screen name="Login" component={FBLoginButton} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
