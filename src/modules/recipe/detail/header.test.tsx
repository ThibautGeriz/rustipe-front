import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-native/extend-expect';
import { render, fireEvent, RenderAPI } from 'react-native-testing-library';

import Header, { DELETE_RECIPE } from './header';
import { GET_RECIPE } from './recipe-detail-query';

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
    it('contain the title', async () => {
      // when
      const result = getHeader();
      await wait();

      // then
      expect(result.getByA11yRole('header')).toHaveTextContent('Lemon pie');
    });
  });

  describe('when pressing back', () => {
    let elem: RenderAPI;
    beforeEach(async () => {
      // given
      elem = getHeader();
      await wait();

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
      await wait();

      // when
      fireEvent.press(elem.getByTestId('DeleteButton'));
      await wait();
    });

    it('should delete the recipe', async () => {
      // then
      expect(deleteRecipe).toHaveBeenCalled();
    });
  });

  describe('when pressing edit', () => {
    let elem: RenderAPI;
    beforeEach(async () => {
      // given
      elem = getHeader();
      await wait();

      // when
      fireEvent.press(elem.getByTestId('EditButton'));
      await wait();
    });

    it('should go on the edit page', async () => {
      // then
      expect(navigate).toHaveBeenCalledWith('RecipeEdition', { id: recipe.id });
    });
  });
});

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));
