import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-native-paper';

import RecipesList from './src/modules/recipe/list';
import RecipesDetail from './src/modules/recipe/detail';
import RecipesCreate from './src/modules/recipe/create';
import type Recipe from './src/modules/recipe/models/recipe';
import { client } from './src/graphql/setup';

export type RootStackParamList = {
  Recipes: {};
  Recipe: { id: string; recipe: Recipe };
  RecipeCreation: {};
};

const Stack = createStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['https://loving-kowalevski-577e95.netlify.app', 'rustipe://'],
  config: {
    screens: {
      Recipes: 'recipes',
      Recipe: 'recipe/:id',
      RecipeCreation: 'recipes/create',
    },
  },
};

export default function App() {
  return (
    <Provider>
      <ApolloProvider client={client}>
        <NavigationContainer linking={linking}>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Recipes" component={RecipesList} />
            <Stack.Screen name="Recipe" component={RecipesDetail} />
            <Stack.Screen name="RecipeCreation" component={RecipesCreate} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}
