/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Card, ListItem, Icon } from 'react-native-elements';
import { View } from 'react-native';

export default function ShortList({
  navigation, navigateTo, headline, list, accept, reject,
}) {
  const [listState, setListState] = useState(list);
  useEffect(() => setListState(list), [list]);

  const handleAccept = (id) => {
    accept(id);
    setListState(listState.filter((li) => li.facebookId !== id));
  };

  const handleReject = (id) => {
    reject(id);
    setListState(listState.filter((li) => li.facebookId !== id));
  };

  return (
    <Card title={headline} titleStyle={{ marginTop: 15 }} containerStyle={{ padding: 0 }}>
      { listState.map((li) => (
        <ListItem
          key={`listitem${li['_id']}`}
          roundAvatar
          title={li.name}
          leftAvatar={{ source: { uri: li.img } }}
          chevron={{ size: 30 }}
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
