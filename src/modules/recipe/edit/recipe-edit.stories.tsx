import React from 'react';
import { action } from '@storybook/addon-actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';

import RecipeEdition from './screen';
import type { RootStackParamList } from '../../../../App';
import fakeRecipe from '../__data__/fake_recipe';
import { GET_RECIPE } from '../detail/recipe-detail-query';

export default { title: 'Recipe Edition', component: RecipeEdition };

const navigate = action('navigate');
const goBack = action('goBack');

const navigation = { navigate, goBack } as StackNavigationProp<RootStackParamList, 'RecipeEdition'>;
const recipe = fakeRecipe();

const route = ({
  params: {
    id: recipe.id,
  },
} as unknown) as RouteProp<RootStackParamList, 'RecipeEdition'>;

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
    <RecipeEdition navigation={navigation} route={route} />
  </MockedProvider>
);
