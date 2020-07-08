import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { render } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';

import { RouteProp } from '@react-navigation/native';

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
      recipe,
    },
  } as RouteProp<RootStackParamList, 'Recipe'>;

  const getRecipeList = (props?: any) =>
    render(<RecipeDetail navigation={navigation} route={route} {...props} />);

  beforeEach(() => {
    navigate.mockReset();
  });

  describe('by default', () => {
    it('contain the ingredients', () => {
      // when
      const result = getRecipeList();

      // then
      expect(result.getByTestId('ingredient0')).toHaveTextContent('3 lemons');
    });

    it('contain the instruction', () => {
      // when
      const result = getRecipeList();

      // then
      expect(result.getByTestId('instruction0')).toHaveTextContent('Lorem ipsum dolor sit amet');
    });
  });
});
