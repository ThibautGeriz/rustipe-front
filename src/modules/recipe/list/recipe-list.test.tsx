import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { StackNavigationProp } from '@react-navigation/stack';
import { MockedProvider } from '@apollo/client/testing';
import fakeRecipe from '../__data__/fake_recipe';

import RecipeList, { GET_MY_RECIPES } from './recipe-list';
import type { RootStackParamList } from '../../../../App';

const mocks = [
  {
    request: {
      query: GET_MY_RECIPES,
    },
    result: {
      data: {
        getMyRecipes: [fakeRecipe()],
      },
    },
  },
];

describe('Recipe List Item', () => {
  const navigate = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'Recipes'>;
  const navigation = ({ navigate } as unknown) as NavType;

  const customRender = (props?: any) =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RecipeList navigation={navigation} {...props} />
      </MockedProvider>,
    );

  beforeEach(() => {
    navigate.mockReset();
  });

  describe('by default', () => {
    it('renders the loader', () => {
      // when
      customRender();

      // then
      expect(screen.getByTestId('FlatList')).toBeTruthy();
    });
  });
});
