import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';
import { render, RenderAPI, fireEvent } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';
import Signin, { SIGNIN } from './user-signin';
import type { RootStackParamList } from '../../../../App';

describe('Signin', () => {
  const navigate = jest.fn();
  const goBack = jest.fn();
  type NavType = StackNavigationProp<RootStackParamList, 'RecipeCreation'>;
  const navigation = ({ navigate, goBack } as unknown) as NavType;
  const route = ({
    params: {},
  } as unknown) as RouteProp<RootStackParamList, 'RecipeCreation'>;

  const signin = jest.fn();

  const customRender = (props?: any, mock?: any[]) =>
    render(
      <MockedProvider mocks={mock || []} addTypename={false}>
        <Signin navigation={navigation} route={route} {...props} />
      </MockedProvider>,
    );

  beforeEach(() => {
    navigate.mockReset();
    goBack.mockReset();
    signin.mockReset();
    signin.mockReturnValue({ data: { signin: 'token' } });
  });

  describe('by default', () => {
    let component: RenderAPI;
    beforeEach(() => {
      component = customRender();
    });

    it('should show the save button', () => {
      // then
      expect(component.getByTestId('signinButton')).toBeEnabled();
    });

    describe('when pressing the save button', () => {
      beforeEach(async () => {
        // when
        fireEvent.press(component.getByTestId('signinButton'));
        await wait();
      });

      it('should not change page', () => {
        // then
        expect(goBack).not.toHaveBeenCalled();
        expect(navigate).not.toHaveBeenCalled();
      });

      it('should show the error message', () => {
        // then
        expect(component.getByText('Email cannot be empty')).toBeEnabled();
      });
    });

    describe('when setting the email', () => {
      beforeEach(async () => {
        // given
        const mocks = [
          {
            request: {
              query: SIGNIN,
              variables: { email: 'some@gmail.com', password: 'p4ssw0rd' },
            },
            result: signin,
          },
        ];
        component = customRender(null, mocks);

        // when
        fireEvent.changeText(component.getByTestId('emailInput'), 'some@gmail.com');
        await wait();
      });

      it('should update the input', () => {
        // then
        expect(component.getByTestId('emailInput')).toHaveProp('value', 'some@gmail.com');
      });

      describe('when setting the password', () => {
        beforeEach(async () => {
          // given

          // when
          fireEvent.changeText(component.getByTestId('passwordInput'), 'p4ssw0rd');
          await wait();
        });

        it('should update the input', () => {
          // then
          expect(component.getByTestId('passwordInput')).toHaveProp('value', 'p4ssw0rd');
        });

        describe('when pressing the save button', () => {
          beforeEach(async () => {
            // when
            fireEvent.press(component.getByTestId('signinButton'));
            await wait();
          });

          it('should change go back', () => {
            // then
            expect(navigate).toHaveBeenCalledWith('Recipes', {});
          });

          it('should show the error message', () => {
            // then
            expect(signin).toHaveBeenCalled();
          });
        });
      });
    });
  });
});

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));
