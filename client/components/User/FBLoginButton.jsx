import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import * as Facebook from '../../node_modules/expo-facebook';
import { AuthContext } from '../../contexts';
import { createUser } from '../../backend';

const appId = '1167950023585231';
const imgSrc = require('../../assets/icon.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C2E7D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: '#143642',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutBtn: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
  },
});

export default function FBLoginButton() {
  const userStateContext = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const abortController = new AbortController();

  useEffect(() => () => abortController.abort(), []);

  const facebookLogIn = async () => {
    await Facebook.initializeAsync(appId);
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(appId, { permissions: ['public_profile'] });
      if (type === 'success') {
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`, { signal: abortController.signal })
          .then((response) => response.json())
          .then(async (data) => {
            setUserData(data);
            await createUser(data, abortController);
            userStateContext.setUserId(data.id);
            userStateContext.setLoggedinStatus(true);
          })
          .catch((e) => console.error(e));
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'sans-serif', fontSize: 55, color: '#143642', fontWeight: 'bold', marginLeft: 60, marginTop: -160 }}>BIDRA. SAMMEN.</Text>
      <Text style={{ marginBottom: 100, fontSize: 18 }}>Appen som gjør det enklere å bidra</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={facebookLogIn}>
        <Text style={{ color: '#C2E7D9' }}>Logg inn med facebook</Text>
      </TouchableOpacity>
    </View>
  );
}
