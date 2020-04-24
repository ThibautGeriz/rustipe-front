import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { List } from 'react-native-paper';

import type Dashboard from '../../models/dashboard';

const { width: viewWidth } = Dimensions.get('window');

export interface DashListItemProps {
  dashboard: Dashboard;
  onSelectDashboard: () => void | null;
}

export default function DashboardListItem({ dashboard, onSelectDashboard }: DashListItemProps) {
  return (
    <List.Item
      style={styles.container}
      title={dashboard.name}
      description={dashboard.description}
      left={(props: any) =>
        dashboard.iconName ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <List.Icon {...props} icon={dashboard.iconName} />
        ) : null
      }
      onPress={onSelectDashboard}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: viewWidth,
  },
});
