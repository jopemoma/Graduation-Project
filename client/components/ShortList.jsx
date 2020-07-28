/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card, ListItem, Icon } from 'react-native-elements';
import { View } from 'react-native';

export default function ShortList({
  navigation, navigateTo, headline, list, accept, reject,
}) {
  const [localState, setLocalState] = useState(list);

  const getNewState = (prevState, response) => {
    const eventIndex = prevState.findIndex((event) => event['_id'] === response['_id']);
    const returnState = prevState;
    returnState[eventIndex] = response;
    return returnState;
  };

  const handleAccept = async (facebookId) => {
    const response = await accept(facebookId);
    setLocalState(getNewState(localState, response));
  };

  return (
    <Card title={headline} containerStyle={{ padding: 0 }}>
      { localState.map((li) => (
        <ListItem
          key={li['_id']}
          roundAvatar
          title={li.name}
          avatar={{ uri: li.img }}
          onPress={() => navigation.navigate(navigateTo, { li })}
          rightElement={accept ? (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Icon size={35} name="check" style={{ marginRight: 50 }} type="font-awesome" color="green" onPress={() => handleAccept(li.facebookId)} />
              <Icon size={35} name="remove" style={{ marginRight: 20 }} type="font-awesome" color="red" onPress={() => reject(li.facebookId)} />
            </View>
          ) : null}
        />
      ))}
    </Card>
  );
}
