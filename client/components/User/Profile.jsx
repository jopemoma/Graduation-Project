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
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Avatar rounded size="large" source={{ uri: profileState.picture.data.url }} />
        <Text>{profileState.name}</Text>
      </View>
      <View>
        <Text>
          Email:
          {profileState.email}
        </Text>
      </View>
    </ScrollView>
  );
}
