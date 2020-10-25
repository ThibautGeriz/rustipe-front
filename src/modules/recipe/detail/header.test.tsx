import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Share } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-native/extend-expect';
import { render, fireEvent, RenderAPI } from 'react-native-testing-library';
import AsyncStorage from '@react-native-community/async-storage';
import { USER_ID_NAME } from '../../user/constants';

import Header, { DELETE_RECIPE, COPY_RECIPE } from './header';
import { GET_RECIPE } from './recipe-detail-query';

import type { RootStackParamList } from '../../../../App';

import fakeRecipe from '../__data__/fake_recipe';

describe('Header', () => {
  const navigate = jest.fn();
  const goBack = jest.fn();
  const shareMock = jest.spyOn(Share, 'share');
  shareMock.mockImplementation();

  type NavType = StackNavigationProp<RootStackParamList, 'Recipes'>;
  const navigation = ({ navigate, goBack } as unknown) as NavType;
  const recipe = fakeRecipe();

  const route = {
    params: {
      id: recipe.id,
    },
  } as RouteProp<RootStackParamList, 'Recipe'>;

  const deleteRecipe = jest.fn();
  const copyRecipe = jest.fn();
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
        query: COPY_RECIPE,
        variables: { recipeId: recipe.id },
      },
      result: copyRecipe,
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

  beforeEach(async () => {
    navigate.mockReset();
    goBack.mockReset();
    shareMock.mockReset();
    deleteRecipe.mockReset();
    deleteRecipe.mockReturnValue({ data: { deleteRecipe: recipe.id } });
    copyRecipe.mockReset();
    copyRecipe.mockReturnValue({ data: { copyRecipe: recipe } });
    await AsyncStorage.setItem(USER_ID_NAME, recipe.userId);
  });

  const getHeader = async (props?: any): Promise<RenderAPI> => {
    const c = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Header navigation={navigation} route={route} {...props} />
      </MockedProvider>,
    );
    await wait();
    return c;
  };

  describe("when it's the user's recipe", () => {
    it('contain the title', async () => {
      // when
      const result = await getHeader();

      // then
      expect(result.getByA11yRole('header')).toHaveTextContent('Lemon pie');
    });

    it('have no add button', async () => {
      // when
      const result = await getHeader();

      // then
      expect(result.queryByTestId('AddButton')).toBeFalsy();
    });

    describe('when pressing back', () => {
      let elem: RenderAPI;
      beforeEach(async () => {
        // given
        elem = await getHeader();
        wait();

        // when
        fireEvent.press(elem.getByTestId('BackAction'));
      });

      it('should go back', () => {
        // then
        expect(navigate).toHaveBeenCalledWith('Recipes', {});
      });
    });

    describe('when pressing sharing', () => {
      let elem: RenderAPI;
      beforeEach(async () => {
        // given
        elem = await getHeader();
        wait();

        // when
        fireEvent.press(elem.getByTestId('ShareButton'));
      });

      it('should share the recipe', () => {
        // then
        expect(shareMock).toHaveBeenCalled();
      });
    });

    describe('when pressing delete', () => {
      let elem: RenderAPI;
      beforeEach(async () => {
        // given
        elem = await getHeader();
        wait();

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
        elem = await getHeader();
        wait();

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

  describe("when it's not the user's recipe", () => {
    beforeEach(async () => {
      await AsyncStorage.setItem(USER_ID_NAME, 'some-other-id');
    });
    it('have an add button', async () => {
      // when
      const result = await getHeader();

      // then
      expect(result.queryByTestId('AddButton')).toBeTruthy();
    });

    describe('when pressing add', () => {
      let elem: RenderAPI;
      beforeEach(async () => {
        // given
        elem = await getHeader();

        // when
        fireEvent.press(elem.getByTestId('AddButton'));
        await wait();
      });

      it('should copy the recipe to your own playbook', async () => {
        // then
        expect(copyRecipe).toHaveBeenCalled();
      });
    });
  });

  describe('when the user is not logged', () => {
    beforeEach(async () => {
      await AsyncStorage.removeItem(USER_ID_NAME);
    });

    it('have an add button', async () => {
      // when
      const result = await getHeader();

      // then
      expect(result.queryByTestId('AddButton')).toBeTruthy();
    });

    describe('when pressing add', () => {
      let elem: RenderAPI;
      beforeEach(async () => {
        // given
        elem = await getHeader();

        // when
        fireEvent.press(elem.getByTestId('AddButton'));
        await wait();
      });

      it('should go on the login page', async () => {
        // then
        expect(navigate).toHaveBeenCalledWith('Signup', {
          redirect: { route: 'Recipe', params: { id: recipe.id } },
        });
      });
    });
  });

  afterEach(() => AsyncStorage.clear());
});

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));
