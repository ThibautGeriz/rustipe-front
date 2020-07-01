import * as React from 'react';
import { shallow } from 'enzyme';
import { FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import RecipeList from './recipe-list';
import type { RootStackParamList } from '../../../../App';

describe('Recipe List Item', () => {
  const navigate = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'Recipes'>;
  const navigation = ({ navigate } as unknown) as NavType;

  const getRecipeList = (props?: any) => shallow(<RecipeList navigation={navigation} {...props} />);

  beforeEach(() => {
    navigate.mockReset();
  });

  describe('by default', () => {
    it('renders the list', () => {
      // when
      const result = getRecipeList();

      // then
      expect(result.exists(FlatList)).toBe(true);
    });
  });
});
