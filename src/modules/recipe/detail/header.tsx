import * as React from 'react';
import { Appbar } from 'react-native-paper';

import type { RecipeDetailProps } from './screen';

const Header = ({ navigation, route }: RecipeDetailProps) => (
  <Appbar.Header>
    <Appbar.BackAction onPress={navigation.goBack} />
    <Appbar.Content title={route.params.recipe.title} />
  </Appbar.Header>
);

export default Header;
