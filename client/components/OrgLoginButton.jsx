import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

export default function OrgLoginButton() {
  return (
    <>
      <Input
        placeholder="Brukernavn"
        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
      />

      <Input
        placeholder="Passord"
        leftIcon={
          <Icon name="user" size={24} color="black" />
        }
      />
    </>
  );
}
