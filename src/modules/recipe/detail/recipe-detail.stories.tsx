import React from 'react';
import { action } from '@storybook/addon-actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import RecipeDetail from './screen';
import recipe from '../__data__/fake_recipe';
import type { RootStackParamList } from '../../../../App';

export default { title: 'Recipe detail', component: RecipeDetail };

const navigate = action('navigate');
const goBack = action('goBack');

const navigation = { navigate, goBack } as StackNavigationProp<RootStackParamList, 'Recipe'>;
const route = ({
  params: {
    recipe,
  },
} as unknown) as RouteProp<RootStackParamList, 'Recipe'>;

export const byDefault = () => <RecipeDetail navigation={navigation} route={route} />;
