import React from 'react';
import { action } from '@storybook/addon-actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Provider } from 'react-native-paper';

import RecipeList from './screen';
import { GET_MY_RECIPES } from './recipe-list-query';
import type { RootStackParamList } from '../../../../App';
import fakeRecipe from '../__data__/fake_recipe';

const mocksWithRecipe: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: GET_MY_RECIPES,
      variables: {
        query: null,
      },
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

export const withRecipes = () => (
  <Provider>
    <MockedProvider mocks={mocksWithRecipe} addTypename={false}>
      <RecipeList navigation={navigation} />
    </MockedProvider>
  </Provider>
);

const mocksWithoutRecipe: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: GET_MY_RECIPES,
    },
    result: {
      data: {
        getMyRecipes: [],
      },
    },
  },
];

export const withoutRecipes = () => (
  <Provider>
    <MockedProvider mocks={mocksWithoutRecipe} addTypename={false}>
      <RecipeList navigation={navigation} />
    </MockedProvider>
  </Provider>
);
