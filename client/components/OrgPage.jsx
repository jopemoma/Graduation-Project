/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { fetchOrgEvent, fetchEvents } from '../backend';
import { AuthContext } from '../contexts';

const imgSrc = require('../assets/mock.png');

export default function OrgPage({ navigation }) {
  const userStateContext = useContext(AuthContext);
  const [orgEventState, setOrgEventState] = useState([{ title: 'Didn\'t work', organizationId: '0' }]);

  useEffect(() => {
    fetchOrgEvent(userStateContext.orgId, setOrgEventState);
  }, []);

  return (
    <ScrollView>
      <Button title="Lag nytt arrangement" type="solid" onPress={() => navigation.push('CreateEvent')} />
      {orgEventState.map((event) => (
        <Card
          title={`${event.title}`}
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
            title="Se detaljer"
            onPress={() => navigation.navigate('Event', { event })}
            key={event.title}
          />
        </Card>
      ))}
    </ScrollView>
  );
}
