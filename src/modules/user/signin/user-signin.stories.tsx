import React from 'react';
import { action } from '@storybook/addon-actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';

import UserSignin from './screen';
import type { RootStackParamList } from '../../../../App';

export default { title: 'User signin', component: UserSignin };

const navigate = action('navigate');
const goBack = action('goBack');

const navigation = { navigate, goBack } as StackNavigationProp<RootStackParamList, 'Signin'>;
const route = ({
  params: {},
} as unknown) as RouteProp<RootStackParamList, 'Signin'>;

export const byDefault = () => (
  <MockedProvider mocks={[]} addTypename={false}>
    <UserSignin navigation={navigation} route={route} />
  </MockedProvider>
);
