import React from 'react';
import { action } from '@storybook/addon-actions';

import ListItem from './list-item';

export default { title: 'Recipe List items', component: ListItem };

const onSelectRecipe = action('item-clicked');

export const byDefault = () => (
  <ListItem
    onSelectRecipe={onSelectRecipe}
    recipe={{ id: 'toto', title: 'Lemon Pie', ingredients: [], instructions: [] }}
  />
);
