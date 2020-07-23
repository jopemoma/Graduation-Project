import React, { useState, useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { createEvent } from '../backend';
import { AuthContext } from '../contexts';
/*
Input:
- title
- location
- description
- time
- date
 */

/*
title
organizationId
location
date
time
description
slotsRemaining
 */

export default function CreateEvent() {
  const userStateContext = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [slotsRemaining, setSlotsRemaining] = useState('');

  const addEvent = async () => {
    //  Call backend function
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
    console.log('This is response from add event:', response);
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
