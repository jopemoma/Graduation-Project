/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FBLoginButton from './components/FBLoginButton';
import Event from './components/Event';
import Home from './components/Home';
import CreateEvent from './components/CreateEvent';
import ListEvents from './components/ListEvents';
import ListVolunteers from './components/ListVolunteers';
import OrgLoginButton from './components/OrgLoginButton';
import UserListEvents from './components/UserListEvents';
import { AuthContext, EventContext } from './contexts';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(false);
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
              <Tab.Navigator>
                <Tab.Screen name="UserListEvents" component={UserListEvents} />
              </Tab.Navigator>
            </NavigationContainer>
          </EventContext.Provider>
        </AuthContext.Provider>
      );
    }
    if (orgId) {
      return (
        <AuthContext.Provider value={authContext}>
          <EventContext.Provider value={eventContext}>
            <NavigationContainer>
              <Tab.Navigator>
                <Tab.Screen name="ListEvents">
                  { (props) => <ListEvents {...props} type="short" /> }
                </Tab.Screen>
                <Tab.Screen name="ListVolunteers">
                  { (props) => <ListVolunteers {...props} type="short" /> }
                </Tab.Screen>
                <Tab.Screen name="Event" component={Event} options={{ title: 'Detaljer', headerTitleAlign: 'center' }} />
                <Tab.Screen name="CreateEvent" component={CreateEvent} />
              </Tab.Navigator>
            </NavigationContainer>
          </EventContext.Provider>
        </AuthContext.Provider>
      );
    }
    return null;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Tab.Screen name="LoginUser" component={FBLoginButton} />
          <Tab.Screen name="LoginOrganisation" component={OrgLoginButton} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
