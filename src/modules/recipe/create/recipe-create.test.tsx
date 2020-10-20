import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';
import { render, RenderAPI, fireEvent } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';
import RecipeCreation, { ADD_RECIPE } from './recipe-create';
import type { RootStackParamList } from '../../../../App';
import recipe from '../__data__/fake_recipe';

describe('Recipe Creation', () => {
  const navigate = jest.fn();
  const goBack = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'RecipeCreation'>;
  const navigation = ({ navigate, goBack } as unknown) as NavType;
  const route = ({
    params: {},
  } as unknown) as RouteProp<RootStackParamList, 'RecipeCreation'>;

  const addRecipe = jest.fn();

  const customRender = (props?: any, mock?: any[]) =>
    render(
      <MockedProvider mocks={mock || []} addTypename={false}>
        <RecipeCreation navigation={navigation} route={route} {...props} />
      </MockedProvider>,
    );

  beforeEach(() => {
    navigate.mockReset();
    goBack.mockReset();
    addRecipe.mockReset();
    addRecipe.mockReturnValue({ data: { addRecipe: recipe() } });
  });

  describe('by default', () => {
    let component: RenderAPI;
    beforeEach(() => {
      component = customRender();
    });

    it('should show the save button', () => {
      // then
      expect(component.getByTestId('save-button')).toBeEnabled();
    });

    describe('when pressing the save button', () => {
      beforeEach(async () => {
        // when
        fireEvent.press(component.getByTestId('save-button'));
        await wait();
      });

      it('should not change page', () => {
        // then
        expect(goBack).not.toHaveBeenCalled();
        expect(navigate).not.toHaveBeenCalled();
      });

      it('should show the error message', () => {
        // then
        expect(component.getByText('Title cannot be empty')).toBeEnabled();
      });
    });

    describe('when setting the title', () => {
      beforeEach(async () => {
        // given
        const mocks = [
          {
            request: {
              query: ADD_RECIPE,
              variables: { title: 'THE title', instructions: [], ingredients: [], imageUrl: null },
            },
            result: addRecipe,
          },
        ];
        component = customRender(null, mocks);

        // when
        fireEvent.changeText(component.getByTestId('titleInput'), 'THE title');
        await wait();
      });

      it('should update the input', () => {
        // then
        expect(component.getByTestId('titleInput')).toHaveProp('value', 'THE title');
      });

      describe('when pressing the save button', () => {
        beforeEach(async () => {
          // when
          fireEvent.press(component.getByTestId('save-button'));
          await wait();
        });

        it('should change go back', () => {
          // then
          expect(goBack).toHaveBeenCalled();
        });

        it('should add the recipe', () => {
          // then
          expect(addRecipe).toHaveBeenCalled();
        });
      });
    });
  });
});

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));
