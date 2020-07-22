import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FBLoginButton from './components/FBLoginButton';
import EventList from './components/EventList';
import { AuthContext } from './contexts';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(false);
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
            </>
          ) : (
            <Stack.Screen name="Login" component={FBLoginButton} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
