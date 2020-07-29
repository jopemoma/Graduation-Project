/* eslint-disable react/prop-types */
/* eslint-disable dot-notation */
import React from 'react';
import { Text, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

export default function UserEventCard(props) {
  const {
    navigation, eventData, functions, context, styles,
  } = props;

  const { userId } = context;
  return (
    <View style={styles.container}>
      <Card
        key={eventData['_id']}
        title={`${eventData.orgName} - ${eventData.name}`}
        image={{ uri: eventData.img }}
      >
        <Text style={{ marginBottom: 10 }}>
          {`${eventData.date} - ${eventData.time}`}
        </Text>
        <Text style={{ fontStyle: 'italic', marginBottom: 10 }}>
          {`Hvor: ${eventData.location}`}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          {eventData.description}
        </Text>
        <Text style={{ color: 'green', marginBottom: 10 }}>
          {`Plasser ledig nå ${eventData.slotsRemaining}`}
        </Text>
        <Button
          icon={<Icon name="check" color="#ffffff" style={{ marginRight: 10 }} />}
          buttonStyle={{
            borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20,
          }}
          title="Bli med nå!"
          onPress={functions.joinEvent}
          disabled={eventData.slotsRemaining === 0
                || eventData.volunteers.includes(userId)
                || eventData.pending.includes(userId)}
        />
        { eventData.volunteers.includes(userId) || eventData.pending.includes(userId)
          ? (
            <Button
              icon={<Icon name="cancel" color="#ffffff" style={{ marginRight: 10 }} />}
              buttonStyle={{
                borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'red',
              }}
              title="Trekk deg"
              onPress={functions.cancelAttendance}
            />
          ) : null}
      </Card>
      <View style={styles.bottom}>
        <Button title="Gå tilbake" type="solid" onPress={() => navigation.navigate('ListEvents')} />
      </View>
    </View>
  );
}
