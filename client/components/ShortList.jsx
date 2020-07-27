/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React from 'react';
import { Card, ListItem } from 'react-native-elements';

export default function ShortList({ onpress, headline, list }) {
  return (
    <Card title={headline} containerStyle={{ padding: 0 }}>
      { list.map((e) => (
        <ListItem
          key={e['_id']}
          roundAvatar
          title={e.title}
          avatar={{ uri: e.img }}
          onPress={onpress(e)}
        />
      ))}
    </Card>
  );
}
