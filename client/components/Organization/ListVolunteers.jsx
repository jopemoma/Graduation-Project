/* eslint-disable react/prop-types */
import { ScrollView } from 'react-native';
import React, {
  useState,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { fetchUsers } from '../../backend';
import LongList from '../common/LongList';
import ShortList from '../common/ShortList';

export default function ListVolunteers({ route, navigation, type }) {
  const [userNameState, setUserNameState] = useState([{ _id: '1', name: 'Laster...', img: 'https://imgur.com/gallery/AizUHEf.jpg' }]);
  const { accept, reject } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      async function get() {
        const userNames = await fetchUsers(route.params.list);
        setUserNameState(userNames);
      }
      get();
    }, []),
  );

  return (
    <ScrollView>
      {type === 'short'
        ? <ShortList headline="Deltagere" accept={accept} reject={reject} list={userNameState} navigation={navigation} navigateTo="Profile" />
        : <LongList list={userNameState} navigation={navigation} navigateTo="Profile" />}
    </ScrollView>
  );
}
