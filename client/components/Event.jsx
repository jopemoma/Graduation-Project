/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { AuthContext } from '../contexts';
import { addUserToEvent } from '../backend';

const imgSrc = require('../assets/mock.png');

export default function Event({ route, navigation }) {
  const userStateContext = useContext(AuthContext);
  const [userEventState, setUserEventState] = useState(route.params.event);
  const { volunteers } = userEventState; // [ '2343242' ]
  const userId = userStateContext.userId || '143616507442543';

  const joinEvent = async () => {
    // eslint-disable-next-line dot-notation
    const response = await addUserToEvent(userId, userEventState['_id']);
    setUserEventState(response);
    console.log('Response from joinEvent:', response);
    console.log('user event statet', userEventState);
    //  TODO: Update event state so that correct number of slots remaining is shown.
  };

  return (
    <Card
      title={`${userEventState.orgName} - ${userEventState.title}`}
      image={imgSrc}
    >
      <Text style={{ marginBottom: 10 }}>
        {`${userEventState.date} - ${userEventState.time}`}
      </Text>
      <Text style={{ fontStyle: 'italic', marginBottom: 10 }}>
        {`Hvor: ${userEventState.location}`}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        {userEventState.description}
      </Text>
      <Text style={{ color: 'green', marginBottom: 10 }}>
        {`Plasser ledig nå ${userEventState.slotsRemaining}`}
      </Text>
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
        }}
        title="Bli med nå!"
        onPress={joinEvent}
        disabled={userEventState.slotsRemaining === 0 || volunteers.includes(userId)}
      />
      <Button title="Gå tilbake" type="solid" onPress={() => navigation.navigate('EventList')} />
    </Card>
  );
}
