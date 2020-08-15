import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import '@testing-library/jest-native/extend-expect';
import { render, fireEvent, RenderAPI } from 'react-native-testing-library';

import Header from './header';
import type { RootStackParamList } from '../../../../App';

describe('Header', () => {
  const navigate = jest.fn();
  const goBack = jest.fn();

  type NavType = StackNavigationProp<RootStackParamList, 'Recipes'>;
  const navigation = ({ navigate, goBack } as unknown) as NavType;

  const route = {
    params: {},
  } as RouteProp<RootStackParamList, 'Recipe'>;

  beforeEach(() => {
    navigate.mockReset();
    goBack.mockReset();
  });

  const getHeader = (props?: any): RenderAPI =>
    render(<Header navigation={navigation} route={route} {...props} />);

  describe('by default', () => {
    it('contain the title', () => {
      // when
      const result = getHeader();

      // then
      expect(result.getByA11yRole('header')).toHaveTextContent('Edit recipe');
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
});
