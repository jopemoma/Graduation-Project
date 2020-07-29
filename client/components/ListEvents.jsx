/* eslint-disable react/prop-types */
import React, {
  useEffect, useContext, useState,
} from 'react';
import { ScrollView } from 'react-native';
import { fetchEvents, fetchOrgEvent } from '../backend';
import { EventContext, AuthContext } from '../contexts';
import LongList from './LongList';
import ShortList from './ShortList';

export default function ListEvents({ navigation, type }) {
  const userStateContext = useContext(AuthContext);
  const eventStateContext = useContext(EventContext);

  const [eventList, setEventList] = useState(null);

  useEffect(() => {
    if (userStateContext.isUser) {
      fetchEvents([eventStateContext.setEventState, setEventList]);
    } else {
      fetchOrgEvent(userStateContext.orgId, setEventList);
    }
  }, [eventStateContext.eventState]);

  if (!eventList) return null;
  if (!eventStateContext.eventState) return null;

  return (
    <ScrollView>
      {type === 'short'
        ? <ShortList headline="Arrangementer i ditt område" list={eventList} navigation={navigation} navigateTo="Event" />
        : <LongList list={eventList} navigation={navigation} navigateTo="Event" />}
    </ScrollView>
  );
}
