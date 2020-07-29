/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React, { useContext } from '../../node_modules/react';
import { createStackNavigator } from '../../node_modules/@react-navigation/stack';
import Profile from '../user/Profile';
import { AuthContext } from '../../contexts';

export default function StackMyEvents() {
  const userStateContext = useContext(AuthContext);
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#D62246',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    >
      <Stack.Screen name="Profile" options={{ title: 'Min profil', headerTitleAlign: 'center' }}>
        {
        (props) => <Profile {...props} route={{ params: { facebookId: userStateContext.userId } }} />
        }
      </Stack.Screen>
    </Stack.Navigator>
  );
}
