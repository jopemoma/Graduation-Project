import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FBLoginButton from './components/FBLoginButton';
import EventList from './components/EventList';
import Event from './components/Event';
import OrgPage from './components/OrgPage';
import Home from './components/Home';
import CreateEvent from './components/CreateEvent';
import OrgLoginButton from './components/OrgLoginButton';
import { AuthContext, EventContext } from './contexts';

const Stack = createStackNavigator();

console.disableYellowBox = true;

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(true);
  const [isUser, setIsUserStatus] = useState(true);
  const [orgId, setOrgId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [eventState, setEventState] = useState(null);

  const authContext = {
    isLoggedin,
    setLoggedinStatus,
    isUser,
    setIsUserStatus,
    orgId,
    setOrgId,
    userId,
    setUserId,
  };

  const eventContext = {
    eventState,
    setEventState,
  };

  if (isLoggedin) {
    if (isUser) {
      return (
        <AuthContext.Provider value={authContext}>
          <EventContext.Provider value={eventContext}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{
                headerStyle: {
                  backgroundColor: '#C2E7D9',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
              >
                <Stack.Screen name="EventList" component={EventList} options={{ title: 'Aktiviteter i nærheten', headerTitleAlign: 'center' }} />
                <Stack.Screen name="Event" component={Event} options={{ title: 'Detaljer', headerTitleAlign: 'center' }} />
              </Stack.Navigator>
            </NavigationContainer>
          </EventContext.Provider>
        </AuthContext.Provider>
      );
    }
    if (orgId) {
      return (
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="OrgPage" component={OrgPage} />
              <Stack.Screen name="CreateEvent" component={CreateEvent} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      );
    }
    return null;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="LoginUser" component={FBLoginButton} />
          <Stack.Screen name="LoginOrganisation" component={OrgLoginButton} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
