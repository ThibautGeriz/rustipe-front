import React from 'react';
import { action } from '@storybook/addon-actions';

import MultiInputText from './multi-inputtext';

export default { title: 'MultiInputText', component: MultiInputText };

const setData = action('setData');

export const withoutData = () => (
  <MultiInputText data={[]} setData={setData} placeholder="My label" />
);

export const withData = () => (
  <MultiInputText data={['string 1', 'string 2']} setData={setData} placeholder="My label" />
);
