import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FBLoginButton from './components/FBLoginButton';
import EventList from './components/EventList';
import Event from './components/Event';
import OrgPage from './components/OrgPage';
import Home from './components/Home';
import CreateEvent from './components/CreateEvent';
import OrgLoginButton from './components/OrgLoginButton';
import { AuthContext, EventContext } from './contexts';

const Drawer = createDrawerNavigator();

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
              <Drawer.Navigator initialRouteName="Eventlist" screenOptions={{
                headerStyle: {
                  backgroundColor: '#C2E7D9',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
              >
                <Drawer.Screen name="EventList" component={EventList} options={{ title: 'Aktiviteter i nærheten', headerTitleAlign: 'center' }} />
                <Drawer.Screen name="Event" component={Event} options={{ title: 'Detaljer', headerTitleAlign: 'center' }} />
              </Drawer.Navigator>
            </NavigationContainer>
          </EventContext.Provider>
        </AuthContext.Provider>
      );
    }
    if (orgId) {
      return (
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="OrgPage">
              <Drawer.Screen name="OrgPage" component={OrgPage} />
              <Drawer.Screen name="CreateEvent" component={CreateEvent} />
            </Drawer.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      );
    }
    return null;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Drawer.Screen name="LoginUser" component={FBLoginButton} />
          <Drawer.Screen name="LoginOrganisation" component={OrgLoginButton} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
