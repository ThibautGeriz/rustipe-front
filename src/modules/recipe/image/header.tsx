import * as React from 'react';
import { Appbar } from 'react-native-paper';

import type { ImageDetailProps } from './screen';

const Header = ({ navigation }: ImageDetailProps) => {
  return (
    <Appbar.Header>
      <Appbar.BackAction testID="BackAction" onPress={navigation.goBack} />
    </Appbar.Header>
  );
};

export default Header;
