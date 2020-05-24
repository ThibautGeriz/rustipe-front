import React from 'react';
import { action } from '@storybook/addon-actions';
import { StackNavigationProp } from '@react-navigation/stack';

import DashboardList from './dashboard-list';
import type { RootStackParamList } from '../../../../App';

export default { title: 'Dashboard List', component: DashboardList };

const navigate = action('navigate');

const navigation = { navigate } as StackNavigationProp<RootStackParamList, 'Dashboards'>;

export const byDefault = () => <DashboardList navigation={navigation} />;
