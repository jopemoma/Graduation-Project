import React, { useState, useContext } from 'react';
import { View, Alert } from 'react-native';
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
      Alert.alert(
        'Feil brukernavn/passord',
        'Vennligst prøv igjen',
        [
          {
            text: 'Avbryt',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
  };

  return (
    <View style={{
      flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#143642',
    }}
    >
      <Input
        placeholder="Brukernavn"
        onChangeText={setUsername}
        inputStyle={{ color: 'white' }}
        leftIcon={{ type: 'font-awesome', name: 'user', color: '#C2E7D9' }}
      />

      <Input
        placeholder="Passord"
        secureTextEntry
        onChangeText={setPassword}
        inputStyle={{ color: 'white' }}
        leftIcon={
          <Icon name="key" size={24} color="#C2E7D9" />
        }
      />
      <Button buttonStyle={{ backgroundColor: '#C2E7D9', borderRadius: 60, width: 260 }} titleStyle={{ color: '#143642' }} title="Logg inn" type="solid" onPress={() => authenticate()} />
    </View>
  );
}
