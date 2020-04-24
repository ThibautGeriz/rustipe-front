import * as React from 'react';
import { shallow } from 'enzyme';
import { FlatList } from 'react-native';

import DashboardList from './dashboard-list';

describe('Dashboard List Item', () => {
  const onSelectDashboard = jest.fn();

  const getDashboardList = (props?: any) => shallow(<DashboardList {...props} />);

  beforeEach(() => {
    onSelectDashboard.mockReset();
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
