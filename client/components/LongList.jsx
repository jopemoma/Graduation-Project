/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View } from 'react-native';
import { Card, Button, Badge, SearchBar } from 'react-native-elements';

export default function LongList({ navigation, navigateTo, list }) {
  return (
    <>
      <SearchBar lightTheme round placeholder="Søk etter arrangement..." containerStyle={{ backgroundColor: 'transparent' }} />
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
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Button
              onPress={() => navigation.navigate(navigateTo, { li })}
              buttonStyle={{
                borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#C2E7D9', width: 190,
              }}
              title="Ledige plasser!"
              titleStyle={{ color: '#0E7C7B' }}
            />
            <View>
              <Badge value={li.slotsRemaining} status={li.slotsRemaining > 5 ? 'success' : 'warning'} />
              <Text>{ li.slotsRemaining > 0 ? 'Ledig' : 'Fullt' }</Text>
            </View>
          </View>
        </Card>
      ))}
    </>

  );
}
