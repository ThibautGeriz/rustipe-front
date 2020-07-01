import * as React from 'react';
import { shallow } from 'enzyme';

import ListItem from './list-item';

describe('Dashboard List Item', () => {
  const onSelectRecipe = jest.fn();

  const getListItem = (props?: any) =>
    shallow(
      <ListItem recipe={{ title: 'Lemon Pie' }} onSelectRecipe={onSelectRecipe} {...props} />,
    );

  beforeEach(() => {
    onSelectRecipe.mockReset();
  });

  describe('by default', () => {
    it('renders the name', () => {
      // when
      const result = getListItem();

      // then
      expect(result.html()).toContain('Lemon Pie');
    });
  });

  describe('when pressing on the item', () => {
    beforeEach(() => {
      // given
      const result = getListItem();

      // when
      result.simulate('press');
    });

    it('should call onSelectRecipe', () => {
      // then
      expect(onSelectRecipe).toHaveBeenCalled();
    });
  });
});
