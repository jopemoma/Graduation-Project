/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import React, { useEffect, useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { fetchEvents } from '../backend';
import { EventContext } from '../contexts';

const imgSrc = require('../assets/mock.png');

export default function EventList({ navigation }) {
  const eventStateContext = useContext(EventContext);

  useEffect(() => {
    fetchEvents(eventStateContext.setEventState);
  }, []);

  if (!eventStateContext.eventState) return null;

  return (
    <ScrollView>
      {eventStateContext.eventState.map((event) => (
        <Card
          key={event['_id']}
          title={`${event.orgName} - ${event.title}`}
          image={imgSrc}
        >
          <Text style={{ marginBottom: 10 }}>
            {event.description}
          </Text>
          <Button
            icon={<Icon name="code" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
            }}
            title="Les mer!"
            onPress={() => navigation.navigate('Event', { event })}
            key={event.title}
          />
        </Card>
      ))}
    </ScrollView>
  );
}
