/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { AuthContext } from '../contexts';
import { addUserToEvent } from '../backend';

const imgSrc = require('../assets/mock.png');

export default function Event({ route, navigation }) {
  const userStateContext = useContext(AuthContext);
  const { event } = route.params;

  const joinEvent = async () => {
    const userId = userStateContext.userId || '143616507442543';
    // eslint-disable-next-line dot-notation
    const response = await addUserToEvent(userId, event['_id']);
    console.log('Response from joinEvent:', response);
    //  TODO: Update event state so that correct number of slots remaining is shown.
  };

  return (
    <Card
      title={`${event.orgName} - ${event.title}`}
      image={imgSrc}
    >
      <Text style={{ marginBottom: 10 }}>
        {`${event.date} - ${event.time}`}
      </Text>
      <Text style={{ fontStyle: 'italic', marginBottom: 10 }}>
        {`Hvor: ${event.location}`}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        {event.description}
      </Text>
      <Text style={{ color: 'green', marginBottom: 10 }}>
        {`Plasser ledig nå ${event.slotsRemaining}`}
      </Text>
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
        }}
        title="Bli med nå!"
        onPress={joinEvent}
      />
    </Card>
  );
}
