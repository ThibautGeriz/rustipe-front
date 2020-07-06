import * as React from 'react';
import { shallow } from 'enzyme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

import Header from './header';
import type { RootStackParamList } from '../../../../App';

describe('Header', () => {
  const navigate = jest.fn();
  const goBack = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'RecipeCreation'>;
  const navigation = ({ navigate, goBack } as unknown) as NavType;
  const route = ({
    params: {},
  } as unknown) as RouteProp<RootStackParamList, 'Recipe'>;

  const getHeader = (props?: any) =>
    shallow(<Header navigation={navigation} route={route} {...props} />);

  beforeEach(() => {
    navigate.mockReset();
  });

  describe('by default', () => {
    it('contain the title', () => {
      // when
      const result = getHeader();

      // then
      expect(result.html()).toContain('Add recipe');
    });
  });

  describe('when pressing back', () => {
    let elem;
    beforeEach(() => {
      // given
      elem = getHeader();
      const button = elem.find(Appbar.BackAction);

      // when
      button.simulate('press');
    });

    it('should go back', () => {
      // then
      expect(goBack).toHaveBeenCalled();
    });
  });
});
