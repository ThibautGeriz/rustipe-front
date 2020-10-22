import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import '@testing-library/jest-native/extend-expect';
import { render, fireEvent, RenderAPI } from 'react-native-testing-library';
import Header from './header';
import type { RootStackParamList } from '../../../../App';

describe('Header', () => {
  const navigate = jest.fn();
  const goBack = jest.fn();

  type NavType = StackNavigationProp<RootStackParamList, 'Image'>;
  const navigation = ({ navigate, goBack } as unknown) as NavType;

  beforeEach(() => {
    navigate.mockReset();
    goBack.mockReset();
  });

  const getHeader = (props?: any): RenderAPI =>
    render(<Header navigation={navigation} {...props} />);

  describe('when pressing back', () => {
    let elem: RenderAPI;
    beforeEach(async () => {
      // given
      elem = getHeader();
      await wait();

      // when
      fireEvent.press(elem.getByTestId('BackAction'));
    });

    it('should go back', () => {
      // then
      expect(goBack).toHaveBeenCalled();
    });
  });
});

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));
