/* eslint-disable react/prop-types */
import { ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';
import { AppLoading } from 'expo';
import { useFocusEffect } from '@react-navigation/native';
import { fetchUserEvents } from '../../backend';
import { AuthContext } from '../../contexts';
import ShortList from '../common/ShortList';

export default function MyEvents({ navigation }) {
  const [confirmedEvents, setConfirmedEvents] = useState(null);
  const [pendingEvents, setPendingEvents] = useState(null);
  const userStateContext = useContext(AuthContext);

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
  if (!confirmedEvents && !pendingEvents) return <AppLoading />;

  return (
    <ScrollView>
      { confirmedEvents ? <ShortList headline="Bekreftede" list={confirmedEvents} navigation={navigation} navigateTo="Event" /> : null}
      { pendingEvents ? <ShortList headline="Ubekreftede" list={pendingEvents} navigation={navigation} navigateTo="Event" /> : null}
    </ScrollView>
  );
}
