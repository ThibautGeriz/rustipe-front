import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useApolloClient } from '@apollo/client';

import { AUTH_TOKEN_NAME } from '../../user/constants';
import type { RecipeListProps } from './screen';

const Header = ({ navigation }: RecipeListProps) => {
  const client = useApolloClient();
  return (
    <Appbar.Header>
      <Appbar.Content title="Rustipe" />
      <Appbar.Action
        icon="logout"
        testID="logout"
        onPress={async () => {
          await AsyncStorage.removeItem(AUTH_TOKEN_NAME);
          await client.clearStore();
          navigation.navigate('Signin', {});
        }}
      />
    </Appbar.Header>
  );
};

export default Header;
