/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View } from 'react-native';
import {
  Card, Button, Badge, SearchBar,
} from 'react-native-elements';

export default function LongList({ navigation, navigateTo, list }) {
  return (
    <>
      <SearchBar lightTheme round placeholder="Søk etter arrangement..." containerStyle={{ backgroundColor: 'transparent' }} />
      { list.map((li) => (
        <Card
          key={li['_id']}
          title={`${li.orgName} - ${li.name}`}
          titleNumberOfLines={2}
          titleStyle={{marginHorizontal: 15 }}
          image={{ uri: li.img }}
        >

          <Text style={{ marginBottom: 10, marginLeft: 15 }}>
            {li.description}
          </Text>
          <View style={{
            flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',
          }}
          >
            <View>
              <Button
                onPress={() => navigation.navigate(navigateTo, { li })}
                buttonStyle={{
                  borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#C2E7D9', width: 190,
                }}
                title="Ledige plasser!"
                titleStyle={{ color: '#143642' }}
              />
              <Badge containerStyle={{ position: 'relative', left: 90, top: -45 }} value={li.slotsRemaining} status={li.slotsRemaining > 5 ? 'success' : 'warning'} />
            </View>
          </View>
        </Card>
      ))}
    </>

  );
}
