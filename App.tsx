import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecipesList from './src/modules/recipe/list';

export type RootStackParamList = {
  Recipes: {};
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Recipes" component={RecipesList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
