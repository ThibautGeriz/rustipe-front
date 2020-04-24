import React from 'react';
import { action } from '@storybook/addon-actions';

import ListItem from './list-item';

export default { title: 'Dashboard List items', component: ListItem };

const onSelectDashboard = action('item-clicked');

export const withOnlyName = () => (
  <ListItem onSelectDashboard={onSelectDashboard} dashboard={{ name: 'My dashboard' }} />
);

export const withOnlyNameAndDescription = () => (
  <ListItem
    onSelectDashboard={onSelectDashboard}
    dashboard={{
      name: 'My dashboard',
      description: 'My awesome new dashboard',
    }}
  />
);

export const withOnlyNameAndDescriptionAndIcon = () => (
  <ListItem
    onSelectDashboard={onSelectDashboard}
    dashboard={{
      name: 'My dashboard',
      description: 'My awesome new dashboard',
      iconName: 'folder',
    }}
  />
);
