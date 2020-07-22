import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { fetchEvents } from '../backend';

export default function EventList() {
  const [eventState, setEventState] = useState([{ title: 'Did not fetch' }]);
  useEffect(() => {
    fetchEvents(setEventState);
  }, []);

  return (
    <>
      <Text>Dette er oppdrag i ditt område:</Text>
      {eventState.map((event) => (
        <View key={event.id}>
          <Text>{event.title}</Text>
          <Text>{event.time}</Text>
          <Text>{event.location}</Text>
        </View>
      ))}
    </>
  );
}
