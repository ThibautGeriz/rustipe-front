import React from 'react';
import { action } from '@storybook/addon-actions';
import { StackNavigationProp } from '@react-navigation/stack';

import RecipeList from './recipe-list';
import type { RootStackParamList } from '../../../../App';

export default { title: 'Recipe List', component: RecipeList };

const navigate = action('navigate');

const navigation = { navigate } as StackNavigationProp<RootStackParamList, 'Recipes'>;

export const byDefault = () => <RecipeList navigation={navigation} />;
