import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashBoardList from './src/modules/dasboards/list';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboards" component={DashBoardList} />
        {/* <Stack.Screen name="Dashboard" component={DashBoardDetails} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
