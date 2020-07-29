import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useContext } from '../../node_modules/react';
import * as Facebook from '../../node_modules/expo-facebook';
import { AuthContext } from '../../contexts';
import { createUser } from '../../backend';

const appId = '1167950023585231';
const imgSrc = require('../../assets/icon.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: '#4267b2',
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

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 200, height: 200, borderRadius: 50, marginVertical: 20,
        }}
        source={imgSrc}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={facebookLogIn}>
        <Text style={{ color: '#fff' }}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}
