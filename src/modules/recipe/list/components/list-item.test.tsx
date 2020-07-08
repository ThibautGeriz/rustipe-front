import * as React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';

import ListItem from './list-item';

describe('Dashboard List Item', () => {
  const onSelectRecipe = jest.fn();

  const getListItem = (props?: any) =>
    render(<ListItem recipe={{ title: 'Lemon Pie' }} onSelectRecipe={onSelectRecipe} {...props} />);

  beforeEach(() => {
    onSelectRecipe.mockReset();
  });

  describe('by default', () => {
    it('renders the name', () => {
      // when
      const result = getListItem();

      // then
      expect(result.getByText('Lemon Pie')).toBeEnabled();
    });
  });

  describe('when pressing on the item', () => {
    beforeEach(() => {
      // given
      const result = getListItem();

      // when
      fireEvent.press(result.getByTestId('Item'));
    });

    it('should call onSelectRecipe', () => {
      // then
      expect(onSelectRecipe).toHaveBeenCalledWith();
    });
  });
});
