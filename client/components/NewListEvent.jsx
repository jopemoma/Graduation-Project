import React, { useEffect, useContext, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { fetchEvents, fetchOrgEvent } from '../backend';
import { EventContext, AuthContext } from '../contexts';

export default function ListEvents({ navigation }, props) {
  const eventStateContext = useContext(EventContext);
  const userStateContext = useContext(AuthContext);

  const [eventList, setEventList] = useState([{ title: 'Didn\'t work', organizationId: '0' }]);

  useEffect(() => {
    if (userStateContext.isUser) {
      fetchEvents([eventStateContext.setEventState, setEventList]);
    } else {
      fetchOrgEvent(userStateContext.orgId, setEventList);
    }
  }, []);

  if (props.type === 'short') {
    return (

    );
  } else {
    return (

    );
  }
}
