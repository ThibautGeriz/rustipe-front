import * as React from 'react';
import { shallow } from 'enzyme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import RecipeDetail from './recipe-detail';
import type { RootStackParamList } from '../../../../App';

import recipe from '../__data__/fake_recipe';

describe('Recipe Detail', () => {
  const navigate = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'Recipes'>;
  const navigation = ({ navigate } as unknown) as NavType;
  const route = ({
    params: {
      recipe,
    },
  } as unknown) as RouteProp<RootStackParamList, 'Recipe'>;

  const getRecipeList = (props?: any) =>
    shallow(<RecipeDetail navigation={navigation} route={route} {...props} />);

  beforeEach(() => {
    navigate.mockReset();
  });

  describe('by default', () => {
    it('contain the ingredients', () => {
      // when
      const result = getRecipeList();

      // then
      expect(result.html()).toContain('3 lemons');
    });

    it('contain the instruction', () => {
      // when
      const result = getRecipeList();

      // then
      expect(result.html()).toContain('Lorem ipsum dolor sit amet');
    });
  });
});
