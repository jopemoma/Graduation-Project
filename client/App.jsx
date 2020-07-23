import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FBLoginButton from './components/FBLoginButton';
import EventList from './components/EventList';
import Event from './components/Event';
import OrgPage from './components/OrgPage';
import Home from './components/Home';
import OrgLoginButton from './components/OrgLoginButton';
import { AuthContext } from './contexts';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [isUser, setIsUserStatus] = useState(true);
  const [orgId, setOrgId] = useState(null);
  const context = {
    isLoggedin,
    setLoggedinStatus,
    isUser,
    setIsUserStatus,
    orgId,
    setOrgId,
  };

  if (isLoggedin) {
    if (isUser) {
      return (
        <AuthContext.Provider value={context}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Eventlist" component={EventList} />
              <Stack.Screen name="Event" component={Event} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      );
    }
    return (
      <AuthContext.Provider value={context}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="orgPage" component={OrgPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
  return (
    <AuthContext.Provider value={context}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="LoginUser" component={FBLoginButton} />
          <Stack.Screen name="LoginOrganisation" component={OrgLoginButton} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
