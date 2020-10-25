import * as React from 'react';
import { Provider } from 'react-native-paper';
import { render, RenderAPI, fireEvent } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';
import { StackNavigationProp } from '@react-navigation/stack';
import { MockedProvider } from '@apollo/client/testing';

import Header from './header';
import type { RootStackParamList } from '../../../../App';

describe('Header Recipe List Item', () => {
  const navigate = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'Recipes'>;
  const navigation = ({ navigate } as unknown) as NavType;

  const customRender = (props?: any) =>
    render(
      <Provider>
        <MockedProvider mocks={[]} addTypename={false}>
          <Header navigation={navigation} {...props} />
        </MockedProvider>
      </Provider>,
    );

  beforeEach(() => {
    navigate.mockReset();
  });
  let component: RenderAPI;

  describe('by default', () => {
    it('renders the title', () => {
      // when
      component = customRender();

      // then
      expect(component.getByText('Rustipe')).toBeEnabled();
    });
  });

  describe('when loging out', () => {
    beforeEach(async () => {
      // given
      component = customRender();

      // when
      fireEvent.press(component.getByTestId('logout'));
      await wait();
    });

    it('should go to the login page', () => {
      // then
      expect(navigate).toHaveBeenCalledWith('Signin', { redirect: null });
    });
  });
});

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));
