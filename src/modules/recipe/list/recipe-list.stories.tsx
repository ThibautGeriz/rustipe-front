import React from 'react';
import { action } from '@storybook/addon-actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import RecipeList from './screen';
import { GET_MY_RECIPES } from './recipe-list';
import type { RootStackParamList } from '../../../../App';
import fakeRecipe from '../__data__/fake_recipe';

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: GET_MY_RECIPES,
    },
    result: {
      data: {
        getMyRecipes: [
          fakeRecipe(),
          fakeRecipe(),
          fakeRecipe(),
          fakeRecipe(),
          fakeRecipe(),
          fakeRecipe(),
          fakeRecipe(),
          fakeRecipe(),
          fakeRecipe(),
        ],
      },
    },
  },
];

export default { title: 'Recipe List', component: RecipeList };

const navigate = action('navigate');

const navigation = { navigate } as StackNavigationProp<RootStackParamList, 'Recipes'>;

export const byDefault = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <RecipeList navigation={navigation} />
  </MockedProvider>
);
