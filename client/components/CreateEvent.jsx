import React, { useState } from 'react';
import { Input, Icon, Button } from 'react-native-elements';

/*
Input: 
- title
- location
- description
- time
- date
 */

export default function CreateEvent() {
  return (
    <>
      <Input
        placeholder="Brukernavn"
        onChangeText={setUsername}
        leftIcon={
          <Icon name="key" size={24} color="black" />
        }
      />

      <Input
        placeholder="Passord"
        secureTextEntry
        onChangeText={setPassword}
        leftIcon={
          <Icon name="key" size={24} color="black" />
        }
      />
      <Button title="Logg inn" type="solid" onPress={() => authenticate()} />
    </>
  );
}