/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchUserEvents } from '../backend';
import { AuthContext } from '../contexts';
import ShortList from './ShortList';

export default function MyEvents({ navigation }) {
  const [confirmedEvents, setConfirmedEvents] = useState(null);
  const [pendingEvents, setPendingEvents] = useState(null);
  const [deniedEvents, setDeniedEvents] = useState(null);
  const userStateContext = useContext(AuthContext);

  useEffect(() => {
    fetchUserEvents(
      [setConfirmedEvents],
      (event) => event.volunteers.includes(userStateContext.userId),
    );
    fetchUserEvents(
      [setPendingEvents],
      (event) => event.pending.includes(userStateContext.userId),
    );
    console.log('this is rendering');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserEvents(
        [setConfirmedEvents],
        (event) => event.volunteers.includes(userStateContext.userId),
      );
      fetchUserEvents(
        [setPendingEvents],
        (event) => event.pending.includes(userStateContext.userId),
      );
    }, []),
  );

  return (
    <ScrollView>
      { confirmedEvents ? <ShortList headline="Bekreftede" list={confirmedEvents} navigation={navigation} navigateTo="Event" /> : null}
      { pendingEvents ? <ShortList headline="Ubekreftede" list={pendingEvents} navigation={navigation} navigateTo="Event" /> : null}
      { deniedEvents ? <ShortList headline="Avslått" list={deniedEvents} navigation={navigation} navigateTo="Event" /> : null}
    </ScrollView>
  );
}
