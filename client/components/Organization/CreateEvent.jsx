/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { createEvent } from '../../backend';
import { AuthContext } from '../../contexts';

export default function CreateEvent({ navigation }) {
  const userStateContext = useContext(AuthContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [img, setImg] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [slotsRemaining, setSlotsRemaining] = useState('');

  const addEvent = async () => {
    const eventData = {
      name,
      organizationId: userStateContext.orgId,
      description,
      img,
      location,
      time,
      date,
      slotsRemaining,
      volunteers: [],
    };
    // eslint-disable-next-line no-unused-vars
    const response = await createEvent(eventData);
    navigation.navigate('ListEvents');
  };

  return (
    <ScrollView>
      <Input
        placeholder="Tittel"
        onChangeText={setName}
      />
      <Input
        placeholder="Beskrivelse"
        onChangeText={setDescription}
      />
      <Input
        placeholder="Bilde"
        onChangeText={setImg}
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
      <View style={{flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button containerStyle={{ marginBottom: 20 }} buttonStyle={{ backgroundColor: '#143642', width: 230, borderRadius: 40 }} titleStyle={{ color: '#C2E7D9' }} title="Create Event" type="solid" onPress={addEvent} />
      </View>
    </ScrollView>
  );
}
