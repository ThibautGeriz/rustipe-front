import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashBoardList from './src/modules/dasboards/list';
import DashBoardDetail from './src/modules/dasboards/detail';
import type Dashboard from './src/modules/dasboards/models/dashboard';

export type RootStackParamList = {
  Dashboards: {};
  Dashboard: { dashboard: Dashboard };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboards" component={DashBoardList} />
        <Stack.Screen
          name="Dashboard"
          component={DashBoardDetail}
          options={({ route }: any) => ({ title: route.params.dashboard.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
