/* eslint-disable react/prop-types */
import React, {
  useEffect, useState,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { fetchUsers } from '../../backend';
/* import { AuthContext } from '../contexts'; */
import LongList from '../Common/LongList';
import ShortList from '../Common/ShortList';

export default function ListVolunteers({ route, navigation, type }) {
  const [userNameState, setUserNameState] = useState([{ _id: '1', name: 'Laster...', img: '' }]);
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
