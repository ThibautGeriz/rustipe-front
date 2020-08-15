import React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import RecipeEdition from './recipe-edit';
import Header from './header';
import type { RootStackParamList } from '../../../../App';

type RecipeEditionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RecipeEdition'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'RecipeEdition'>;

export interface RecipeEditionProps {
  navigation: RecipeEditionScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

export default function Screen(props: any) {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <Header {...props} />
      <RecipeEdition {...props} />
    </View>
  );
}
