import React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import RecipeList from './recipe-list';
import Header from './header';

import type { RootStackParamList } from '../../../../App';

type RecipeListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Recipes'>;

export interface RecipeListProps {
  navigation: RecipeListScreenNavigationProp;
}

export default function Screen(props: RecipeListProps) {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <Header {...props} />
      <RecipeList {...props} />
    </View>
  );
}
