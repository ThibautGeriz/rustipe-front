import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-native/extend-expect';
import { render, fireEvent, waitFor, RenderAPI } from 'react-native-testing-library';

import Header, { DELETE_RECIPE } from './header';
import type { RootStackParamList } from '../../../../App';

import fakeRecipe from '../__data__/fake_recipe';

describe('Header', () => {
  const navigate = jest.fn();
  const goBack = jest.fn();

  type NavType = StackNavigationProp<RootStackParamList, 'Recipes'>;
  const navigation = ({ navigate, goBack } as unknown) as NavType;
  const recipe = fakeRecipe();

  const route = {
    params: {
      id: recipe.id,
      recipe,
    },
  } as RouteProp<RootStackParamList, 'Recipe'>;

  const deleteRecipe = jest.fn();
  const mocks = [
    {
      request: {
        query: DELETE_RECIPE,
        variables: { id: recipe.id },
      },
      result: deleteRecipe,
    },
  ];

  beforeEach(() => {
    navigate.mockReset();
    goBack.mockReset();
    deleteRecipe.mockReset();
    deleteRecipe.mockReturnValue({ data: { deleteRecipe: recipe.id } });
  });

  const getHeader = (props?: any): RenderAPI =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Header navigation={navigation} route={route} {...props} />
      </MockedProvider>,
    );

  describe('by default', () => {
    it('contain the title', () => {
      // when
      const result = getHeader();

      // then
      expect(result.getByA11yRole('header')).toHaveTextContent('Lemon pie');
    });
  });

  describe('when pressing back', () => {
    let elem: RenderAPI;
    beforeEach(() => {
      // given
      elem = getHeader();

      // when
      fireEvent.press(elem.getByTestId('BackAction'));
    });

    it('should go back', () => {
      // then
      expect(goBack).toHaveBeenCalled();
    });
  });

  describe('when pressing delete', () => {
    let elem: RenderAPI;
    beforeEach(async () => {
      // given
      elem = getHeader();

      // when
      fireEvent.press(elem.getByTestId('DeleteButton'));
    });

    it('should go back', async () => {
      // then
      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('Recipes', {});
      });
      expect(deleteRecipe).toHaveBeenCalled();
    });
  });
});
