import * as React from 'react';
import { Appbar } from 'react-native-paper';

import type { RecipeDetailProps } from './screen';

const Header = ({ navigation }: RecipeDetailProps) => (
  <Appbar.Header>
    <Appbar.BackAction onPress={navigation.goBack} />
    <Appbar.Content title="Add recipe" />
  </Appbar.Header>
);

export default Header;
