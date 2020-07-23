import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

export default function Event({ route, navigation }) {
  const { event } = route.params;
  return (
    <Card
      title={`${event.orgName} - ${event.title}`}
      image={require('../assets/mock.png')}
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
        onPress={() => console.log('You want to join, too bad')}
        key={event.title}
      />
    </Card>
  );
}
