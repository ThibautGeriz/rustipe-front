import * as React from 'react';
import { shallow } from 'enzyme';
import { FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import DashboardList from './dashboard-list';
import type { RootStackParamList } from '../../../../App';

describe('Dashboard List Item', () => {
  const navigate = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'Dashboards'>;
  const navigation = ({ navigate } as unknown) as NavType;

  const getDashboardList = (props?: any) =>
    shallow(<DashboardList navigation={navigation} {...props} />);

  beforeEach(() => {
    navigate.mockReset();
  });

  describe('by default', () => {
    it('renders the list', () => {
      // when
      const result = getDashboardList();

      // then
      expect(result.exists(FlatList)).toBe(true);
    });
  });
});
