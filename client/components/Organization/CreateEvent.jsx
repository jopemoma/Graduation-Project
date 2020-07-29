/* eslint-disable react/prop-types */
import React, { useState, useContext } from '../../node_modules/react';
import { Input, Button } from '../../node_modules/react-native-elements';
import { createEvent } from '../../backend';
import { AuthContext } from '../../contexts';

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
      volunteers: [],
    };
    // eslint-disable-next-line no-unused-vars
    const response = await createEvent(eventData);
    // TODO: check that the response is ok, give feedback and send organization to OrgPage
    navigation.navigate('ListEvents');
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
      <Button title="Back" type="solid" onPress={() => navigation.navigate('OrgPage')} />
    </>
  );
}
