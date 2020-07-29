/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { fetchUserEvents } from '../backend';
import { AuthContext } from '../contexts';
import ShortList from './ShortList';

export default function MyEvents({ navigation }) {
  const [events, setEvents] = useState(null);
  const userStateContext = useContext(AuthContext);

  useEffect(() => {
    fetchUserEvents(userStateContext.userId, [setEvents]);
  }, []);

  return (
    <ScrollView>
      { events ? <ShortList headline="Arrangementer" list={events} navigation={navigation} navigateTo="Event" /> : null}
    </ScrollView>
  );
}
