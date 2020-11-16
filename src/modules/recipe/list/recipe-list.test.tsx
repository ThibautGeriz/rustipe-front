import * as React from 'react';
import { Provider } from 'react-native-paper';
import { render, RenderAPI, fireEvent } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';
import { StackNavigationProp } from '@react-navigation/stack';
import { MockedProvider } from '@apollo/client/testing';
import fakeRecipe from '../__data__/fake_recipe';

import RecipeList from './recipe-list';
import { GET_MY_RECIPES } from './recipe-list-query';
import type { RootStackParamList } from '../../../../App';

const recipe = fakeRecipe();
const mocks = [
  {
    request: {
      query: GET_MY_RECIPES,
      variables: {
        query: null,
      },
    },
    result: {
      data: {
        getMyRecipes: [recipe],
      },
    },
  },
];

describe('Recipe List Item', () => {
  const navigate = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'Recipes'>;
  const navigation = ({ navigate } as unknown) as NavType;

  const customRender = (props?: any, mockOveride?: any[]) =>
    render(
      <Provider>
        <MockedProvider mocks={mockOveride || mocks} addTypename={false}>
          <RecipeList navigation={navigation} {...props} />
        </MockedProvider>
      </Provider>,
    );

  beforeEach(() => {
    navigate.mockReset();
  });
  let component: RenderAPI;

  describe('by default', () => {
    it('renders the empty search bar', () => {
      // when
      component = customRender();

      // then
      expect(component.getByPlaceholder('Search')).toHaveProp('value', null);
    });

    it('renders the flatlist loading', () => {
      // when
      component = customRender();

      // then
      expect(component.getByTestId('FlatList')).toHaveProp('data', []);
      expect(component.getByTestId('FlatList')).toHaveProp('refreshing', true);
    });
  });

  describe('after loading', () => {
    beforeEach(async () => {
      // when
      component = customRender();
      await wait();
    });

    it('renders the flatlist with its element ', async () => {
      // then
      expect(component.getByTestId('FlatList')).toHaveProp('refreshing', false);
      expect(component.getByText('Lemon pie')).toBeEnabled();
    });

    describe('when pressing on the item', () => {
      beforeEach(() => {
        // when
        fireEvent.press(component.getByText('Lemon pie'));
      });

      it('should navigate to the detail of the recipe', () => {
        // then
        expect(navigate).toHaveBeenCalledWith('Recipe', {
          id: recipe.id,
        });
      });
    });
  });

  describe('after an error', () => {
    it('should the error message', async () => {
      // given
      const errorMocks = [
        {
          request: {
            query: GET_MY_RECIPES,
            variables: { query: null },
          },
          error: new Error('aw shucks'),
        },
      ];

      // when
      component = customRender(null, errorMocks);
      await wait();
      // then
      expect(component.getByTestId('FlatList')).toHaveProp('refreshing', false);
      component.getAllByText('aw shucks').forEach((e: any) => expect(e).toBeEnabled());
    });
  });
});

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));
