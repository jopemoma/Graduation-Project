/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Button,
} from 'react-native-elements';
import { color } from 'react-native-reanimated';

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.push('LoginUser')} style={{ backgroundColor: '#C2E7D9', flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 40, fontFamily: 'sans-serif', fontWeight: 'bold', color: '#0F084B', textAlign: 'center'}}>LOGG IN SOM FRIVILLIG</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('LoginOrganisation')} style={{ backgroundColor: '#0F084B', flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 40, fontFamily: 'sans-serif', fontWeight: 'bold', color: '#C2E7D9', textAlign: 'center'}}>LOGG IN SOM ORGANISASJON</Text>
      </TouchableOpacity>
    </View>
  );
}
