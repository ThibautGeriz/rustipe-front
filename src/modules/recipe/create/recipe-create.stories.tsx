import React from 'react';
import { action } from '@storybook/addon-actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';

import RecipeCreation from './screen';
import type { RootStackParamList } from '../../../../App';

export default { title: 'Recipe Creation', component: RecipeCreation };

const navigate = action('navigate');
const goBack = action('goBack');

const navigation = { navigate, goBack } as StackNavigationProp<
RootStackParamList,
'RecipeCreation'
>;
const route = ({
  params: {},
} as unknown) as RouteProp<RootStackParamList, 'RecipeCreation'>;

export const byDefault = () => (
  <MockedProvider mocks={[]} addTypename={false}>
    <RecipeCreation navigation={navigation} route={route} />
  </MockedProvider>
);
