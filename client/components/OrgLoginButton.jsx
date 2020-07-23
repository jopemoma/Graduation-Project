import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';


export default function OrgLoginButton() {
  const authenticate = () => {
  
  }
  return (
    <>
      <Input 
        ref={username}
        placeholder="Brukernavn"
        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
      />

      <Input
        ref={password}
        placeholder="Passord"
        leftIcon={
          <Icon name="user" size={24} color="black" />
        }
      />
      <Button title="Logg inn" type="solid" onPress={() => authenticate()} />
    </>
  );
}
