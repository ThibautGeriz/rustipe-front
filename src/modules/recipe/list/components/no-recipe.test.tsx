import * as React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';
import { StackNavigationProp } from '@react-navigation/stack';
import { Provider } from 'react-native-paper';
import { MockedProvider } from '@apollo/client/testing';

import NoRecipe from './no-recipe';
import type { RootStackParamList } from '../../../../../App';

describe('Dashboard List Item', () => {
  const navigate = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'Recipes'>;
  const navigation = ({ navigate } as unknown) as NavType;

  const getNoRecipeComponent = (props?: any, mockOveride?: any[]) =>
    render(
      <Provider>
        <MockedProvider mocks={mockOveride || []} addTypename={false}>
          <NoRecipe navigation={navigation} {...props} />
        </MockedProvider>
      </Provider>,
    );

  describe('by default', () => {
    it('a helping message', () => {
      // when
      const result = getNoRecipeComponent();

      // then
      expect(result.getByText('Look like, you do not have any recipes just yet.')).toBeEnabled();
    });
  });

  describe('when pressing on the plus button', () => {
    beforeEach(() => {
      // given
      const result = getNoRecipeComponent();

      // when
      fireEvent.press(result.getByTestId(`addButton`));
    });

    it('should navigate to the right screen', () => {
      // then
      expect(navigate).toHaveBeenCalledWith('RecipeCreation', {});
    });
  });
});
