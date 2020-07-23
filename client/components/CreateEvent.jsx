import React, { useState, useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { createEvent } from '../backend';
import { AuthContext } from '../contexts';

export default function CreateEvent({ navigation }) {
  const userStateContext = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [slotsRemaining, setSlotsRemaining] = useState('');

  const addEvent = async () => {
    const eventData = {
      title,
      organizationId: userStateContext.orgId,
      description,
      location,
      time,
      date,
      slotsRemaining,
    };
    const response = await createEvent(eventData);
    //ToDo check that the response is ok, give feedback and send organization to OrgPage
    navigation.push('OrgPage');
  };

  return (
    <>
      <Input
        placeholder="Tittel"
        onChangeText={setTitle}
      />
      <Input
        placeholder="Beskrivelse"
        onChangeText={setDescription}
      />
      <Input
        placeholder="Sted"
        onChangeText={setLocation}
      />
      <Input
        placeholder="Dato"
        onChangeText={setDate}
      />
      <Input
        placeholder="Tidspunkt"
        onChangeText={setTime}
      />
      <Input
        placeholder="Antall plasser"
        onChangeText={setSlotsRemaining}
      />

      <Button title="Create Event" type="solid" onPress={addEvent} />
      <Button title="Back" type="solid" />
    </>
  );
}
