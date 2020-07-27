/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

export default function LongList({ onpress, list }) {
  return (
    <>
      { list.map((e) => (
        <Card
          key={e['_id']}
          title={`${e.orgName} - ${e.title}`}
          image={e.img}
          titleNumberOfLines={2}
        >
          <Text style={{ marginBottom: 10 }}>
            {e.description}
          </Text>
          <Button
            buttonStyle={{
              borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#0F084B',
            }}
            title="Les mer!"
            onPress={onpress(e)}
            key={e.title}
          />
        </Card>
      ))}
    </>

  );
}
