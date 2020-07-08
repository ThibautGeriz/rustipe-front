import * as React from 'react';
import { Appbar } from 'react-native-paper';

import type { RecipeCreationProps } from './screen';

const Header = ({ navigation }: RecipeCreationProps) => (
  <Appbar.Header>
    <Appbar.BackAction testID="BackAction" onPress={navigation.goBack} />
    <Appbar.Content title="Add recipe" />
  </Appbar.Header>
);

export default Header;
