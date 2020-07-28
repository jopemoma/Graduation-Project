/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React from 'react';
import { Card, ListItem } from 'react-native-elements';

export default function ShortList({
  navigation, navigateTo, headline, list,
}) {
  return (
    <Card title={headline} containerStyle={{ padding: 0 }}>
      { list.map((li) => (
        <ListItem
          key={li['_id']}
          roundAvatar
          title={li.name}
          avatar={{ uri: li.img }}
          onPress={() => navigation.navigate(navigateTo, { li })}
        />
      ))}
    </Card>
  );
}
