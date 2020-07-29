/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import Home from './components/Common/Home';
import OrgLoginButton from './components/Organization/OrgLoginButton';
import StackListEvents from './components/Stack/StackListEvents';
import StackOrgListEvents from './components/Stack/StackOrgListEvents';
import StackOrgCreateEvent from './components/Stack/StackOrgCreateEvent';
import StackMyEvents from './components/Stack/StackMyEvents';
import StackMyProfile from './components/Stack/StackMyProfile';
import FBLoginButton from './components/User/FBLoginButton';

import { AuthContext, EventContext } from './contexts';

const Tab = createBottomTabNavigator();
const LoginStack = createStackNavigator();

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
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'TabListEvents') {
                      return (
                        <MaterialIcons name="event-available" size={size} color={color} />
                      );
                    }
                    return (
                      <Ionicons name={focused ? 'ios-list-box' : 'ios-list'} size={size} color={color} />
                    );
                  },
                })}
                tabBarOptions={{
                  activeTintColor: '#0F084B',
                  inactiveTintColor: 'gray',
                }}
              >
                <Tab.Screen name="TabListEvents" component={StackListEvents} options={{ title: 'Arrangementer' }} />
                <Tab.Screen name="TabMyEvents" component={StackMyEvents} options={{ title: 'Påmeldinger' }} />
                <Tab.Screen name="TabMyProfile" component={StackMyProfile} options={{ title: 'Min profil' }} />
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
                <Tab.Screen name="TabOrgListEvents" component={StackOrgListEvents} options={{ title: 'Arrangementer' }} />
                <Tab.Screen name="TabOrgCreateEvent" component={StackOrgCreateEvent} options={{ title: 'Ny oppføring' }} />
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
        <LoginStack.Navigator>
          <LoginStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <LoginStack.Screen name="LoginUser" component={FBLoginButton} />
          <LoginStack.Screen name="LoginOrganisation" component={OrgLoginButton} />
        </LoginStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
