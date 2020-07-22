import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { fetchEvents } from '../backend';

export default function EventList() {
  const [eventState, setEventState] = useState([{ title: 'Did not fetch' }]);
  useEffect(() => {
    fetchEvents(setEventState);
  }, []);

  return (
    <Text>{eventState[0].title}</Text>
  );
}
