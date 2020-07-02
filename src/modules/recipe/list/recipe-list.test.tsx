import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { MockedProvider } from '@apollo/client/testing';
import fakeRecipe from '../__data__/fake_recipe';

import RecipeList, { GET_MY_RECIPES } from './recipe-list';
import type { RootStackParamList } from '../../../../App';

const mocks = [
  {
    request: {
      query: GET_MY_RECIPES,
      variables: {
        userId: 'b8427f3a-ac40-4b62-9fe2-688b3b014160',
      },
    },
    result: {
      data: {
        getMyRecipes: [fakeRecipe],
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
      expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();
    });
  });
});
