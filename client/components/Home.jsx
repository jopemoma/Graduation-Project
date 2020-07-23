/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button,
} from 'react-native-elements';

export default function Home({ navigation }) {
  return (
    <>
      <Button type="solid" title="User Login" onPress={() => navigation.push('LoginUser')} />
      <Button type="outline" title="Organisation Login" onPress={() => navigation.push('LoginOrganisation')} />
    </>
  );
}
