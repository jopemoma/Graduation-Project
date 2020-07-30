/* eslint-disable react/prop-types */
import React, {
  useContext, useState,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { fetchEvents, fetchOrgEvent } from '../../../backend';
import { EventContext, AuthContext } from '../../../contexts';
import LongList from '../LongList';
import ShortList from '../ShortList';

export default function ListEvents({ navigation, type }) {
  const userStateContext = useContext(AuthContext);
  const eventStateContext = useContext(EventContext);

  const [eventList, setEventList] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      if (userStateContext.isUser) {
        fetchEvents([eventStateContext.setEventState, setEventList]);
      } else {
        fetchOrgEvent(userStateContext.orgId, setEventList);
      }
    }),
  );

  if (!eventList) return null;
  if (!eventStateContext.eventState) return null;

  return (
    <ScrollView>
      {type === 'short'
        ? <ShortList headline="Arrrangementer" list={eventList} navigation={navigation} navigateTo="Event" />
        : <LongList list={eventList} navigation={navigation} navigateTo="Event" />}
    </ScrollView>
  );
}
