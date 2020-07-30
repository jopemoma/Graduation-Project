/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Card, ListItem, Icon } from 'react-native-elements';
import { View } from 'react-native';

export default function ShortList({
  navigation, navigateTo, headline, list, accept, reject,
}) {
  const handleAccept = (id) => {
    accept(id);
  };

  const handleReject = (id) => {
    reject(id);
  };

  return (
    <Card title={headline} containerStyle={{ padding: 0 }}>
      { list.map((li) => (
        <ListItem
          key={`listitem${li['_id']}`}
          roundAvatar
          title={li.name}
          avatar={{ uri: li.img }}
          onPress={() => navigation.navigate(navigateTo, { li })}
          rightElement={accept ? (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Icon size={35} name="check" style={{ marginRight: 50 }} type="font-awesome" color="green" onPress={() => handleAccept(li.facebookId)} />
              <Icon size={35} name="remove" style={{ marginRight: 20 }} type="font-awesome" color="red" onPress={() => handleReject(li.facebookId)} />
            </View>
          ) : null}
        />
      ))}
    </Card>
  );
}
