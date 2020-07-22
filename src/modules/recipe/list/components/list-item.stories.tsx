import React from 'react';
import { action } from '@storybook/addon-actions';

import ListItem from './list-item';
import fakeRecipe from '../../__data__/fake_recipe';

export default { title: 'Recipe List items', component: ListItem };

const onSelectRecipe = action('item-clicked');

export const byDefault = () => <ListItem onSelectRecipe={onSelectRecipe} recipe={fakeRecipe()} />;
