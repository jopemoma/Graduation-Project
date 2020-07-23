import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { authenticateUser } from '../backend';

export default function OrgLoginButton() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authenticate = async () => {
    console.log('This is username', username);
    console.log('This is password', password);
    const authData = await authenticateUser(username, password);
    // TODO: authData is { result: <boolean>, organizationId: X }
    //  set state according to result from authData
  };

  return (
    <>
      <Input
        placeholder="Brukernavn"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
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
