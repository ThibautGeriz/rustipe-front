import React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import RecipeDetail from './recipe-detail';
import Header from './header';
import type { RootStackParamList } from '../../../../App';

export type RecipeDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Recipe'>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Recipe'>;

export interface RecipeDetailProps {
  navigation: RecipeDetailScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

export default function Screen(props: any) {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <Header {...props} />
      <RecipeDetail {...props} />
    </View>
  );
}
