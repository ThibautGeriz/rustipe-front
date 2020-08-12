import * as React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';

import ListItem from './small-list-item';
import fakeRecipe from '../../__data__/fake_recipe';

describe('Dashboard List Item', () => {
  const onSelectRecipe = jest.fn();
  const defaultRecipe = fakeRecipe();

  const getListItem = (props?: any) =>
    render(<ListItem recipe={defaultRecipe} onSelectRecipe={onSelectRecipe} {...props} />);

  beforeEach(() => {
    onSelectRecipe.mockReset();
  });

  describe('by default', () => {
    it('renders the name', () => {
      // when
      const result = getListItem();

      // then
      expect(result.getByText('Lemon pie')).toBeEnabled();
    });
  });

  describe('when pressing on the item', () => {
    beforeEach(() => {
      // given
      const result = getListItem();

      // when
      fireEvent.press(result.getByTestId(`Item-${defaultRecipe.id}`));
    });

    it('should call onSelectRecipe', () => {
      // then
      expect(onSelectRecipe).toHaveBeenCalledWith();
    });
  });
});
