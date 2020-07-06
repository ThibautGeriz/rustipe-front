import React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import RecipeDetail from './recipe-create';
import Header from './header';
import type { RootStackParamList } from '../../../../App';

type RecipeCreationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RecipeCreation'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'RecipeCreation'>;

export interface RecipeCreationProps {
  navigation: RecipeCreationScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

export default (props: any) => (
  <View style={{ height: '100%', width: '100%' }}>
    <Header {...props} />
    <RecipeDetail {...props} />
  </View>
);
