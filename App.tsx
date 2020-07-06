import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';

import RecipesList from './src/modules/recipe/list';
import RecipesDetail from './src/modules/recipe/detail';
import RecipesCreate from './src/modules/recipe/create';
import type Recipe from './src/modules/recipe/models/recipe';
import { client } from './src/graphql/setup';

export type RootStackParamList = {
  Recipes: {};
  Recipe: { recipe: Recipe };
  RecipeCreation: {};
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Recipes" component={RecipesList} />
          <Stack.Screen name="Recipe" component={RecipesDetail} />
          <Stack.Screen name="RecipeCreation" component={RecipesCreate} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
