import React from 'react';
import { Button } from 'react-native-elements';

export default function OrgPage({ navigation }) {
  return (
    <Button title="Create Event" type="solid" onPress={() => navigation.push('CreateEvent')} />
  );
}
