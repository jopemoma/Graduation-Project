/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { AuthContext, EventContext } from '../contexts';

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
    .filter((event) => event['_id'] === route.params.e['_id'])[0]);

  const getNewState = (prevState, response) => {
    const eventIndex = prevState.findIndex((event) => event['_id'] === response['_id']);
    const returnState = prevState;
    returnState[eventIndex] = response;
    return returnState;
  };

  return (
    <View style={styles.container}>
      <Card
        key={currentEventState['_id']}
        title={`${currentEventState.orgName} - ${currentEventState.title}`}
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
          icon={<Icon name="check" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
          }}
          title="Bli med nå!"
          onPress={}
          disabled={currentEventState.slotsRemaining === 0
            || currentEventState.volunteers.includes(userId)}
        />
      </Card>
      <View style={styles.bottom}>
        <Button title="Gå tilbake" type="solid" onPress={() => navigation.navigate('ListEvent')} />
      </View>
    </View>
  );
}