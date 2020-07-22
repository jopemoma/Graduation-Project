import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as Facebook from 'expo-facebook';
import { AuthContext } from '../contexts';
import { updateUser } from '../backend';

const appId = '1167950023585231';
const imgSrc = require('../assets/icon.png');

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
  const [isImageLoading, setImageLoadStatus] = useState(false);

  const facebookLogIn = async () => {
    await Facebook.initializeAsync(appId);
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(appId, { permissions: ['public_profile'] });
      if (type === 'success') {
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then((response) => response.json())
          .then((data) => {
            updateUser(data.id, data.name);
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

  const logout = () => {
    userStateContext.setLoggedinStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
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
