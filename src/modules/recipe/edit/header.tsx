import * as React from 'react';
import { Appbar } from 'react-native-paper';

import type { RecipeEditionProps } from './screen';

const Header = ({ navigation }: RecipeEditionProps) => (
  <Appbar.Header>
    <Appbar.BackAction testID="BackAction" onPress={navigation.goBack} />
    <Appbar.Content title="Edit recipe" />
  </Appbar.Header>
);

export default Header;
