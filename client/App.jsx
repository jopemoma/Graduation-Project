import React from 'react';
import { View } from 'react-native';
import FBLoginButton from './components/FBLoginButton';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FBLoginButton />
    </View>
  );
}
