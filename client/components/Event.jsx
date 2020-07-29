/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { AuthContext, EventContext } from '../contexts';
import {
  addUserToEvent, acceptVolunteer, rejectVolunteer, cancelEvent, fetchEvents, removeUserFromEvent,
} from '../backend';

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
      marginBottom: 5,
    },
  });

  // eslint-disable-next-line no-unused-vars
  const [currentEventState, setCurrentEventState] = useState(oldState
    .filter((event) => event['_id'] === route.params.li['_id'])[0]);

  const getNewState = (prevState, response) => {
    const eventIndex = prevState.findIndex((event) => event['_id'] === response['_id']);
    const returnState = prevState;
    returnState[eventIndex] = response;
    return returnState;
  };

  const userId = userStateContext.userId || '143616507442543';

  const joinEvent = async () => {
    // eslint-disable-next-line dot-notation
    const response = await addUserToEvent(userId, currentEventState['_id']);
    setCurrentEventState(response);
    eventStateContext.setEventState(getNewState(oldState, response));
  };

  const cancelAttendance = async () => {
    // eslint-disable-next-line dot-notation
    const response = await removeUserFromEvent(userId, currentEventState['_id']);
    setCurrentEventState(response);
    eventStateContext.setEventState(getNewState(oldState, response));
  };

  const handleVolunteer = async (id, func) => {
    // eslint-disable-next-line dot-notation
    const response = await func(id, currentEventState['_id']);
    setCurrentEventState(response);
    eventStateContext.setEventState(getNewState(oldState, response));
    return response;
  };

  const handleCancelEvent = async (id) => {
    await cancelEvent(id);
    await fetchEvents([eventStateContext.setEventState, setCurrentEventState], {});
    navigation.navigate('ListEvents');
  };

  if (userStateContext.isUser) {
    return (
      <View style={styles.container}>
        <Card
          key={currentEventState['_id']}
          title={`${currentEventState.orgName} - ${currentEventState.name}`}
          image={{ uri: currentEventState.img }}
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
            icon={<Icon name="check" color="#ffffff" style={{ marginRight: 10 }} />}
            buttonStyle={{
              borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20,
            }}
            title="Bli med nå!"
            onPress={joinEvent}
            disabled={currentEventState.slotsRemaining === 0
                || currentEventState.volunteers.includes(userId)
                || currentEventState.pending.includes(userId)}
          />
          { currentEventState.volunteers.includes(userId) || currentEventState.pending.includes(userId)
            ? (
              <Button
                icon={<Icon name="cancel" color="#ffffff" style={{ marginRight: 10 }} />}
                buttonStyle={{
                  borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'red',
                }}
                title="Trekk deg"
                onPress={cancelAttendance}
              />
            ) : null}
        </Card>
        <View style={styles.bottom}>
          <Button title="Gå tilbake" type="solid" onPress={() => navigation.navigate('ListEvents')} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Card
        key={currentEventState['_id']}
        title={`${currentEventState.name}`}
        image={{ uri: currentEventState.img }}
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
          {`Ledige plasser ${currentEventState.slotsRemaining}`}
        </Text>
        <Button
          buttonStyle={{
            borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5,
          }}
          onPress={() => navigation.navigate('ListVolunteers', { list: currentEventState.volunteers })}
          title="Se deltagere"
        />
        <Button
          buttonStyle={{
            borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5,
          }}
          title="Endre eventdetaljer"
        />
        <Button
          buttonStyle={{
            borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5,
          }}
          onPress={() => navigation.navigate('ListVolunteers', {
            list: currentEventState.pending,
            accept: (id) => handleVolunteer(id, acceptVolunteer),
            reject: (id) => handleVolunteer(id, rejectVolunteer),
          })}
          title="Se søkere"
        />
        <Button
          buttonStyle={{
            borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
          }}
          title="Slett arrangement"
          onPress={() => {
            handleCancelEvent(currentEventState['_id']);
          }}
        />
      </Card>
      <View style={styles.bottom}>
        <Button title="Gå tilbake" type="solid" onPress={() => navigation.navigate('ListEvents')} />
      </View>
    </View>
  );
}
