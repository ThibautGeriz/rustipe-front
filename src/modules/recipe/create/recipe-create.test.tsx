import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import RecipeCreation from './recipe-create';
import type { RootStackParamList } from '../../../../App';

describe('Recipe Detail', () => {
  const navigate = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'RecipeCreation'>;
  const navigation = ({ navigate } as unknown) as NavType;
  const route = ({
    params: {},
  } as unknown) as RouteProp<RootStackParamList, 'RecipeCreation'>;

  const customRender = (props?: any) =>
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <RecipeCreation navigation={navigation} route={route} {...props} />
      </MockedProvider>,
    );

  describe('by default', () => {
    beforeEach(() => {
      customRender();
    });

    it('should show the save button', () => {
      // then
      expect(screen.getByTestId('save-button')).toBeTruthy();
    });
  });
});
