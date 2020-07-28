/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

export default function LongList({ navigation, navigateTo, list }) {
  return (
    <>
      { list.map((li) => (
        <Card
          key={li['_id']}
          title={`${li.orgName} - ${li.name}`}
          titleNumberOfLines={2}
          image={{ uri: li.img }}
        >

          <Text style={{ marginBottom: 10 }}>
            {li.description}
          </Text>

          <Button
            onPress={() => navigation.navigate(navigateTo, { li })}
            buttonStyle={{
              borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#0F084B',
            }}
            title="Les mer!"
          />
        </Card>
      ))}
    </>

  );
}
