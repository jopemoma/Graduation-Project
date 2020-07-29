/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { AuthContext, EventContext } from '../../../contexts';
import {
  addUserToEvent, cancelEvent, fetchEvents, removeUserFromEvent,
} from '../../../backend';

/*
import/no-unresolved  is disabled here due to a bug with eslint.
*/
// eslint-disable-next-line import/no-unresolved
import UserEventCard from './UserEventCard';
// eslint-disable-next-line import/no-unresolved
import OrgEventCard from './OrgEventCard';

export default function Event({ route, navigation }) {
  const userStateContext = useContext(AuthContext);
  const eventStateContext = useContext(EventContext);

  const oldState = eventStateContext.eventState;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    image: {
      marginTop: 50,
    },
    bottom: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 5,
    },
  });

  const userId = userStateContext.userId || '143616507442543';

  // eslint-disable-next-line no-unused-vars
  const [currentEventState, setCurrentEventState] = useState(oldState
    .filter((event) => event['_id'] === route.params.li['_id'])[0]);

  const getNewState = (prevState, response) => {
    const eventIndex = prevState.findIndex((event) => event['_id'] === response['_id']);
    const returnState = prevState;
    returnState[eventIndex] = response;
    return returnState;
  };

  const joinEvent = async () => {
    const response = await addUserToEvent(userId, currentEventState['_id']);
    setCurrentEventState(response);
    eventStateContext.setEventState(getNewState(oldState, response));
  };

  const cancelAttendance = async () => {
    const response = await removeUserFromEvent(userId, currentEventState['_id']);
    setCurrentEventState(response);
    eventStateContext.setEventState(getNewState(oldState, response));
  };

  const handleVolunteer = async (id, func) => {
    const response = await func(id, currentEventState['_id']);
    setCurrentEventState(response);
    eventStateContext.setEventState(getNewState(oldState, response));
    return response;
  };

  const handleCancelEvent = async (id) => {
    await cancelEvent(id);
    await fetchEvents([eventStateContext.setEventState, setCurrentEventState], {});
    navigation.navigate('ListEvents');
  };

  const handlersForUserEventCard = {
    getNewState,
    joinEvent,
    cancelAttendance,
  };

  const handlersForOrgEventCard = {
    handleVolunteer,
    handleCancelEvent,
  };

  const contextPropForChildren = {
    userId,
  };

  return userStateContext.isUser ? (
    <UserEventCard
      navigation={navigation}
      eventData={currentEventState}
      context={contextPropForChildren}
      functions={handlersForUserEventCard}
      styles={styles}
    />
  ) : (
    <OrgEventCard
      navigation={navigation}
      eventData={currentEventState}
      functions={handlersForOrgEventCard}
      styles={styles}
    />
  );
}
