import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Appbar } from 'react-native-paper';
import { useApolloClient } from '@apollo/client';

import { AUTH_TOKEN_NAME, USER_ID_NAME } from '../../user/constants';
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
          await AsyncStorage.removeItem(USER_ID_NAME);
          await client.clearStore();
          navigation.navigate('Signin', { redirect: null });
        }}
      />
    </Appbar.Header>
  );
};

export default Header;
