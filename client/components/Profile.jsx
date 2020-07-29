/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { fetchUser } from '../backend';

export default function Profile({ route, navigation }) {
  const [profileState, setProfileState] = useState(null);

  useEffect(async () => {
    setProfileState(await fetchUser(route.params.userId));
  }, [profileState]);

  if (!profileState) return null;

  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Avatar rounded size="medium" source={{ uri: profileState.picture.data.url }} />
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
