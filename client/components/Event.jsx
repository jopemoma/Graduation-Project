/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { AuthContext, EventContext } from '../contexts';
import { addUserToEvent } from '../backend';

const imgSrc = require('../assets/mock.png');

export default function Event({ route, navigation }) {
  const userStateContext = useContext(AuthContext);
  const eventStateContext = useContext(EventContext);

  const oldState = eventStateContext.eventState;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    image: {
      marginTop: 50,
    },
    bottom: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 36,
    },
  });

  // eslint-disable-next-line no-unused-vars
  const [currentEventState, setCurrentEventState] = useState(oldState
    .filter((event) => event['_id'] === route.params.event['_id'])[0]);

  const getNewState = (prevState, response) => {
    const eventIndex = prevState.findIndex((event) => event['_id'] === response['_id']);
    const returnState = prevState;
    returnState[eventIndex] = response;
    console.log('This is the returnState from getNewState', returnState);
    return returnState;
  };

  const userId = userStateContext.userId || '143616507442543';

  const joinEvent = async () => {
    // eslint-disable-next-line dot-notation
    const response = await addUserToEvent(userId, currentEventState['_id']);
    setCurrentEventState(response);
    eventStateContext.setEventState(getNewState(oldState, response));
  };

  return (
    <View style={styles.container}>
      <Card
        key={currentEventState['_id']}
        title={`${currentEventState.orgName} - ${currentEventState.title}`}
        image={imgSrc}
      >
        <Text style={{ marginBottom: 10 }}>
          {`${currentEventState.date} - ${currentEventState.time}`}
        </Text>
        <Text style={{ fontStyle: 'italic', marginBottom: 10 }}>
          {`Hvor: ${currentEventState.location}`}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          {currentEventState.description}
        </Text>
        <Text style={{ color: 'green', marginBottom: 10 }}>
          {`Plasser ledig nå ${currentEventState.slotsRemaining}`}
        </Text>
        <Button
          icon={<Icon name="check" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
          }}
          title="Bli med nå!"
          onPress={joinEvent}
          disabled={currentEventState.slotsRemaining === 0
            || currentEventState.volunteers.includes(userId)}
        />
      </Card>
      <View style={styles.bottom}>
        <Button title="Gå tilbake" type="solid" onPress={() => navigation.navigate('EventList')} />
      </View>
    </View>
  );
}
