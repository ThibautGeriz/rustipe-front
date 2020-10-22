import React from 'react';
import { action } from '@storybook/addon-actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import ImageDetail from './screen';
import type { RootStackParamList } from '../../../../App';

export default { title: 'Image detail', component: ImageDetail };

const navigate = action('navigate');
const goBack = action('goBack');

const navigation = { navigate, goBack } as StackNavigationProp<RootStackParamList, 'Image'>;

const route = {
  params: {
    imageUrl: 'https://reactnative.dev/img/header_logo.svg',
  },
} as RouteProp<RootStackParamList, 'Image'>;

export const byDefault = () => <ImageDetail navigation={navigation} route={route} />;
