import React from 'react';
import { action } from '@storybook/addon-actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';

import RecipeDetail from './screen';
import fakeRecipe from '../__data__/fake_recipe';
import type { RootStackParamList } from '../../../../App';
import { GET_RECIPE } from './recipe-detail-query';

export default { title: 'Recipe detail', component: RecipeDetail };

const navigate = action('navigate');
const goBack = action('goBack');

const navigation = { navigate, goBack } as StackNavigationProp<RootStackParamList, 'Recipe'>;
const recipe = fakeRecipe();

const route = {
  params: {
    id: recipe.id,
  },
} as RouteProp<RootStackParamList, 'Recipe'>;

const mocks = [
  {
    request: {
      query: GET_RECIPE,
      variables: { id: recipe.id },
    },
    result: {
      data: {
        getRecipe: recipe,
      },
    },
  },
];

export const byDefault = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <RecipeDetail navigation={navigation} route={route} />
  </MockedProvider>
);
