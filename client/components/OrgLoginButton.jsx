import React from 'react';

import {
  Input,
  Icon,
} from 'react-native-elements';

export default function OrgLoginButton() {
  return (
    <>
      <Input
        placeholder="INPUT WITH ICON"
        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
      />
      <Input
        placeholder="INPUT WITH CUSTOM ICON"
        leftIcon={(
          <Icon
            name="user"
            size={24}
            color="black"
          />
      )}
      />
    </>
  );
}
