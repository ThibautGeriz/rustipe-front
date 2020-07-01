import React from 'react';
import { action } from '@storybook/addon-actions';

import ListItem from './list-item';

export default { title: 'Recipe List items', component: ListItem };

const onSelectRecipe = action('item-clicked');

export const withOnlyName = () => (
  <ListItem
    onSelectRecipe={onSelectRecipe}
    recipe={{ title: 'Lemon Pie', ingredients: [], instructions: [] }}
  />
);
