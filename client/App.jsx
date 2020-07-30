/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './components/common/Home';
import OrgLoginButton from './components/organization/OrgLoginButton';
import StackListEvents from './components/stack/StackListEvents';
import StackOrgListEvents from './components/stack/StackOrgListEvents';
import StackOrgCreateEvent from './components/stack/StackOrgCreateEvent';
import StackMyEvents from './components/stack/StackMyEvents';
import StackMyProfile from './components/stack/StackMyProfile';
import FBLoginButton from './components/user/FBLoginButton';
import { AuthContext, EventContext } from './contexts';

console.disableYellowBox = true;

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
                    if (route.name === 'TabMyProfile') {
                      return (
                        <Ionicons name="ios-person" size={size} color={color} />
                      );
                    }
                    return (
                      <Ionicons name={focused ? 'ios-list-box' : 'ios-list'} size={size} color={color} />
                    );
                  },
                })}
                tabBarOptions={{
                  activeTintColor: '#143642',
                  inactiveTintColor: 'gray',
                  activeBackgroundColor: '#C2E7D9',
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
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    if (route.name === 'TabOrgListEvents') {
                      return (
                        <MaterialIcons name="event-available" size={size} color={color} />
                      );
                    }
                    return (
                      <MaterialCommunityIcons name="account-edit" size={size} color={color} />
                    );
                  },
                })}
                tabBarOptions={{
                  activeTintColor: '#C2E7D9',
                  inactiveTintColor: 'gray',
                  activeBackgroundColor: '#143642',
                }}
              >
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
        <LoginStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#C2E7D9',
          },
          headerTintColor: '#143642',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        >
          <LoginStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <LoginStack.Screen name="LoginUser" component={FBLoginButton} options={{ title: 'Logg  inn med FaceBook', headerTitleAlign: 'center' }} />
          <LoginStack.Screen
            name="LoginOrganisation"
            component={OrgLoginButton}
            options={{
              title: 'Logg  som administrator', headerTitleAlign: 'center', headerStyle: { backgroundColor: '#143642' }, headerTintColor: '#C2E7D9',
            }}
          />
        </LoginStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
