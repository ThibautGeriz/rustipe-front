import * as React from 'react';
import { shallow } from 'enzyme';

import ListItem from './list-item';

describe('Dashboard List Item', () => {
  const onSelectDashboard = jest.fn();

  const getListItem = (props?: any) =>
    shallow(
      <ListItem
        dashboard={{ name: 'My Dashboard' }}
        onSelectDashboard={onSelectDashboard}
        {...props}
      />,
    );

  beforeEach(() => {
    onSelectDashboard.mockReset();
  });

  describe('by default', () => {
    it('renders the name', () => {
      // when
      const result = getListItem();

      // then
      expect(result.html()).toContain('My Dashboard');
    });
  });

  describe('when pressing on the item', () => {
    beforeEach(() => {
      // given
      const result = getListItem();

      // when
      result.simulate('press');
    });

    it('should call onSelectDashboard', () => {
      // then
      expect(onSelectDashboard).toHaveBeenCalled();
    });
  });
});
