import * as React from 'react';
import { shallow } from 'enzyme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

import Header from './header';
import type { RootStackParamList } from '../../../../App';

import recipe from '../__data__/fake_recipe';

describe('Header', () => {
  const navigate = jest.fn();
  const goBack = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'Recipes'>;
  const navigation = ({ navigate, goBack } as unknown) as NavType;
  const route = ({
    params: {
      recipe,
    },
  } as unknown) as RouteProp<RootStackParamList, 'Recipe'>;

  const getRecipeList = (props?: any) =>
    shallow(<Header navigation={navigation} route={route} {...props} />);

  beforeEach(() => {
    navigate.mockReset();
  });

  describe('by default', () => {
    it('contain the title', () => {
      // when
      const result = getRecipeList();

      // then
      expect(result.html()).toContain('Lemon pie');
    });
  });

  describe('when pressing back', () => {
    let elem;
    beforeEach(() => {
      // given
      elem = getRecipeList();
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
