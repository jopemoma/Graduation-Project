/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { fetchEvents } from '../backend';

export default function EventList({ navigation }) {
  const [eventState, setEventState] = useState([{ title: 'Did not fetch' }]);
  useEffect(() => {
    fetchEvents(setEventState);
  }, []);

  return (
    <ScrollView>
      {eventState.map((event) => (
        <Card
          title={event.title}
          image={require('../assets/mock.png')}
        >
          <Text style={{ marginBottom: 10 }}>
            {event.description}
          </Text>
          <Button
            icon={<Icon name="code" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
            }}
            title="Bli med nå!"
            onPress={() => navigation.push('Event')}
            key={event.title}
          />
        </Card>
      ))}
    </ScrollView>
  );
}
