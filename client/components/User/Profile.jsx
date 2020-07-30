/* eslint-disable react/prop-types */
import { ScrollView, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-elements';
import { fetchUser } from '../../backend';

export default function Profile({ route, navigation }) {
  const [profileState, setProfileState] = useState(null);
  const userId = route.params.facebookId;

  useEffect(() => {
    async function get() {
      setProfileState(await fetchUser(userId));
    }
    get();
  }, []);

  if (!profileState) return null;

  return (
    <ScrollView>
      <View style={{
        flex: 1, marginTop: 35, justifyContent: 'center', alignItems: 'center',
      }}
      >
        <Avatar
          containerStyle={{ marginBottom: 25 }}
          rounded
          size={260}
          source={{ uri: profileState.picture.data.url }}
        />
        <Text style={{
          marginBottom: 10, fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 33,
        }}
        >
          {profileState.name}
        </Text>
        <Text style={{ fontFamily: 'sans-serif', fontSize: 15 }}>
          {profileState.email}
        </Text>
      </View>
    </ScrollView>
  );
}
