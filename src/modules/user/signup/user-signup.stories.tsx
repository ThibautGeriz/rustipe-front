import React from 'react';
import { action } from '@storybook/addon-actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';

import UserSignup from './screen';
import type { RootStackParamList } from '../../../../App';

export default { title: 'User signup', component: UserSignup };

const navigate = action('navigate');
const goBack = action('goBack');

const navigation = { navigate, goBack } as StackNavigationProp<RootStackParamList, 'Signup'>;
const route = ({
  params: {},
} as unknown) as RouteProp<RootStackParamList, 'Signup'>;

export const byDefault = () => (
  <MockedProvider mocks={[]} addTypename={false}>
    <UserSignup navigation={navigation} route={route} />
  </MockedProvider>
);
