/* eslint-disable react/prop-types */
/* eslint-disable dot-notation */
import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';

import {
  acceptVolunteer, rejectVolunteer,
} from '../../../backend';

export default function OrgEventCard(props) {
  const {
    navigation, eventData, functions, styles,
  } = props;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card
          key={eventData['_id']}
          title={`${eventData.name}`}
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
            {`Ledige plasser ${eventData.slotsRemaining}`}
          </Text>
          <Button
            buttonStyle={{
              borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5,
            }}
            onPress={() => navigation.navigate('ListVolunteers', { list: eventData.volunteers })}
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
              list: eventData.pending,
              accept: (id) => functions.handleVolunteer(id, acceptVolunteer),
              reject: (id) => functions.handleVolunteer(id, rejectVolunteer),
            })}
            title="Se søkere"
          />
          <Button
            buttonStyle={{
              borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
            }}
            title="Slett arrangement"
            onPress={() => {
              functions.handleCancelEvent(eventData['_id']);
            }}
          />
        </Card>
      </View>
    </ScrollView>
  );
}
