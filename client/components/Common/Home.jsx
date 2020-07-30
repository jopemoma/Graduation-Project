/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate('LoginUser')} style={{ backgroundColor: '#C2E7D9', flex: 1, justifyContent: 'center' }}>
        <Text style={{
          fontSize: 40, fontFamily: 'sans-serif', fontWeight: 'bold', color: '#143642', textAlign: 'center',
        }}
        >
          LOGG INN SOM FRIVILLIG
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginOrganisation')} style={{ backgroundColor: '#143642', flex: 1, justifyContent: 'center' }}>
        <Text style={{
          fontSize: 40, fontFamily: 'sans-serif', fontWeight: 'bold', color: '#C2E7D9', textAlign: 'center',
        }}
        >
          LOGG INN SOM ORGANISASJON
        </Text>
      </TouchableOpacity>
    </View>
  );
}
