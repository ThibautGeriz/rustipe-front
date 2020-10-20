import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';
import { render, RenderAPI, fireEvent } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';

import { GET_RECIPE } from '../detail/recipe-detail-query';
import RecipeUpdate, { UPDATE_RECIPE } from './recipe-edit';
import type { RootStackParamList } from '../../../../App';
import fakeRecipe from '../__data__/fake_recipe';
import type Recipe from '../models/recipe';

const recipe = {
  ...fakeRecipe(),
  instructions: [],
  ingredients: [],
};
const recipeUpdated: Recipe = {
  ...recipe,
  title: 'new title',
};

const getRecipeMock = {
  request: {
    query: GET_RECIPE,
    variables: { id: recipe.id },
  },
  result: {
    data: {
      getRecipe: recipe,
    },
  },
};

describe('Recipe Edition', () => {
  const navigate = jest.fn();
  const goBack = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'RecipeEdition'>;
  const navigation = ({ navigate, goBack } as unknown) as NavType;
  const route = ({
    params: {
      id: recipe.id,
    },
  } as unknown) as RouteProp<RootStackParamList, 'RecipeEdition'>;

  const updateRecipe = jest.fn();

  const customRender = (props?: any, mock?: any[]) =>
    render(
      <MockedProvider mocks={mock || [getRecipeMock]} addTypename={false}>
        <RecipeUpdate navigation={navigation} route={route} {...props} />
      </MockedProvider>,
    );

  beforeEach(() => {
    navigate.mockReset();
    goBack.mockReset();
    updateRecipe.mockReset();
    updateRecipe.mockReturnValue({ data: { updateRecipe: recipeUpdated } });
  });

  describe('by default', () => {
    let component: RenderAPI;
    beforeEach(async () => {
      component = customRender();
      await wait();
    });

    it('should show the save button', () => {
      // then
      expect(component.getByTestId('save-button')).toBeEnabled();
    });

    describe('when setting the field', () => {
      beforeEach(async () => {
        // given
        const mocks = [
          {
            request: {
              query: UPDATE_RECIPE,
              variables: {
                ...recipe,
                title: 'new title',
                description: 'new desc',
                recipeYield: '4 persons',
                category: 'main',
                cuisine: 'Asian',
                prepTimeInMinute: 12,
                cookTimeInMinute: 20,
              },
            },
            result: updateRecipe,
          },
          getRecipeMock,
        ];
        component = customRender(null, mocks);
        await wait();

        // when
        fireEvent.changeText(component.getByTestId('titleInput'), 'new title');
        fireEvent.changeText(component.getByTestId('descriptionInput'), 'new desc');
        fireEvent.changeText(component.getByTestId('recipeYieldInput'), '4 persons');
        fireEvent.changeText(component.getByTestId('categoryInput'), 'main');
        fireEvent.changeText(component.getByTestId('cuisineInput'), 'Asian');
        fireEvent.changeText(component.getByTestId('prepTimeInMinuteInput'), '12');
        fireEvent.changeText(component.getByTestId('cookTimeInMinuteInput'), '20');
        await wait();
      });

      it('should update the title', () => {
        // then
        expect(component.getByTestId('titleInput')).toHaveProp('value', 'new title');
      });

      it('should update the description', () => {
        // then
        expect(component.getByTestId('descriptionInput')).toHaveProp('value', 'new desc');
      });

      it('should update the recipeYield', () => {
        // then
        expect(component.getByTestId('recipeYieldInput')).toHaveProp('value', '4 persons');
      });

      it('should update the category', () => {
        // then
        expect(component.getByTestId('categoryInput')).toHaveProp('value', 'main');
      });

      it('should update the cuisine', () => {
        // then
        expect(component.getByTestId('cuisineInput')).toHaveProp('value', 'Asian');
      });

      describe('when pressing the save button', () => {
        beforeEach(async () => {
          // when
          fireEvent.press(component.getByTestId('save-button'));
          await wait();
        });

        it('should change go back', () => {
          // then
          expect(navigate).toHaveBeenCalledWith('Recipe', { id: recipe.id });
        });

        it('should update the recipe', () => {
          // then
          expect(updateRecipe).toHaveBeenCalled();
        });
      });
    });
  });
});

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));
