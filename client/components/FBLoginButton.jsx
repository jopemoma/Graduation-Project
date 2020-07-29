import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Facebook from 'expo-facebook';
import { AppLoading } from 'expo';
import {
  useFonts,
  LoveYaLikeASister_400Regular,
} from '@expo-google-fonts/love-ya-like-a-sister';
import { AuthContext } from '../contexts';
import { createUser } from '../backend';

const appId = '1167950023585231';
const imgSrc = require('../assets/icon.png');

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

  const facebookLogIn = async () => {
    await Facebook.initializeAsync(appId);
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(appId, { permissions: ['public_profile'] });
      if (type === 'success') {
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then((response) => response.json())
          .then((data) => {
            createUser(data);
            userStateContext.setUserId(data.id);
            userStateContext.setLoggedinStatus(true);
            setUserData(data);
          })
          .catch((e) => console.log(e));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  const [fontsLoaded] = useFonts({
    LoveYaLikeASister_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
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
