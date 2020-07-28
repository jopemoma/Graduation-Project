/* eslint-disable react/prop-types */
import React, {
  useEffect, useState,
} from 'react';
import { ScrollView } from 'react-native';
import { fetchUsers } from '../backend';
/* import { AuthContext } from '../contexts'; */
import LongList from './LongList';
import ShortList from './ShortList';

export default function ListVolunteers({ route, navigation, type }) {
  /* const userStateContext = useContext(AuthContext); */
  const [userNameState, setUserNameState] = useState([{ _id: '1', name: 'Laster...', img: '' }]);
  const { accept, reject } = route.params;

  useEffect(() => {
    async function get() {
      const userNames = await fetchUsers(route.params.list);
      setUserNameState(userNames);
    }
    get();
  }, []);

  return (
    <ScrollView>
      {type === 'short'
        ? <ShortList headline="Deltagere" accept={accept} reject={reject} list={userNameState} navigation={navigation} navigateTo="Volunteer" />
        : <LongList list={userNameState} navigation={navigation} navigateTo="Volunteer" />}
    </ScrollView>
  );
}