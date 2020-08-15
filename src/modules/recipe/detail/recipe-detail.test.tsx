import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { render } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import { RouteProp } from '@react-navigation/native';

import { GET_RECIPE } from './recipe-detail-query';
import RecipeDetail from './recipe-detail';
import type { RootStackParamList } from '../../../../App';

import fakeRecipe from '../__data__/fake_recipe';

describe('Recipe Detail', () => {
  const navigate = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'Recipes'>;
  const navigation = ({ navigate } as unknown) as NavType;
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

  const getRecipeList = (props?: any) =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RecipeDetail navigation={navigation} route={route} {...props} />
      </MockedProvider>,
    );

  beforeEach(() => {
    navigate.mockReset();
  });

  describe('by default', () => {
    it('contain the ingredients', async () => {
      // when
      const result = getRecipeList();
      await wait();

      // then
      expect(result.getByTestId('ingredient0')).toHaveTextContent('3 lemons');
    });

    it('contain the instruction', async () => {
      // when
      const result = getRecipeList();
      await wait();

      // then
      expect(result.getByTestId('instruction0')).toHaveTextContent('Lorem ipsum dolor sit amet');
    });
  });
});

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));
