import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { authenticateUser } from '../../backend';
import { AuthContext } from '../../contexts';

export default function OrgLoginButton() {
  const userStateContext = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authenticate = async () => {
    const authData = await authenticateUser(username, password);
    if (authData.result) {
      userStateContext.setLoggedinStatus(true);
      userStateContext.setIsUserStatus(false);
      userStateContext.setOrgId(authData.organizationId);
    } else {
      // TODO display error message to user
      console.log('Wrong password or username');
    }
  };

  return (
    <>
      <Input
        placeholder="Brukernavn"
        onChangeText={setUsername}
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
