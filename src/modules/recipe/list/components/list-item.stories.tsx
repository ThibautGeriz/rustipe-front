import React from 'react';
import { action } from '@storybook/addon-actions';

import SmallListItem from './small-list-item';
import BigListItem from './big-list-item';
import fakeRecipe from '../../__data__/fake_recipe';

export default { title: 'Recipe List items', component: SmallListItem };

const onSelectRecipe = action('item-clicked');

export const onSmallScreen = () => (
  <SmallListItem onSelectRecipe={onSelectRecipe} recipe={fakeRecipe()} />
);

export const onBigScreen = () => (
  <BigListItem onSelectRecipe={onSelectRecipe} recipe={fakeRecipe()} />
);
