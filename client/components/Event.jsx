/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { AuthContext, EventContext } from '../contexts';
import { addUserToEvent } from '../backend';

const imgSrc = require('../assets/mock.png');

export default function Event({ route, navigation }) {
  const userStateContext = useContext(AuthContext);
  const eventStateContext = useContext(EventContext);

  // eslint-disable-next-line dot-notation
  console.log('This is eventState in Event:', eventStateContext.eventState);
  const oldState = eventStateContext.eventState;

  const currentEvent = eventStateContext
    .eventState
    .filter((event) => event['_id'] === route.params.event['_id'])[0];
  const userId = userStateContext.userId || '143616507442543';

  const joinEvent = async () => {
    console.log('Old state:', oldState);
    // eslint-disable-next-line dot-notation
    const response = await addUserToEvent(userId, currentEvent['_id']);
    const oldEventIndex = eventStateContext.eventState.findIndex((event) => event['_id'] === currentEvent['_id']);
    console.log('Old event index', oldEventIndex);
    const newState = oldState.splice(oldEventIndex, 1, response);
    console.log('New state:', newState);
    eventStateContext.setEventState([newState]);
  };

  return (
    <Card
      title={`${currentEvent.orgName} - ${currentEvent.title}`}
      image={imgSrc}
    >
      <Text style={{ marginBottom: 10 }}>
        {`${currentEvent.date} - ${currentEvent.time}`}
      </Text>
      <Text style={{ fontStyle: 'italic', marginBottom: 10 }}>
        {`Hvor: ${currentEvent.location}`}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        {currentEvent.description}
      </Text>
      <Text style={{ color: 'green', marginBottom: 10 }}>
        {`Plasser ledig nå ${currentEvent.slotsRemaining}`}
      </Text>
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
        }}
        title="Bli med nå!"
        onPress={joinEvent}
        disabled={currentEvent.slotsRemaining === 0 || currentEvent.volunteers.includes(userId)}
      />
      <Button title="Gå tilbake" type="solid" onPress={() => navigation.navigate('EventList')} />
    </Card>
  );
}
