import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import { Provider as UiProvider } from 'react-native-paper';
import { AppLoading } from 'expo';
import { AsyncStorage } from 'react-native';

import RecipesList from './src/modules/recipe/list';
import RecipesDetail from './src/modules/recipe/detail';
import RecipesCreate from './src/modules/recipe/create';
import UserSignup from './src/modules/user/signup';
import UserSignin from './src/modules/user/signin';
import type Recipe from './src/modules/recipe/models/recipe';
import { client } from './src/graphql/setup';
import { AUTH_TOKEN_NAME } from './src/modules/user/constants';
import { navigationRef } from './src/rootNavigation';

export type RootStackParamList = {
  Recipes: {};
  Recipe: { id: string; recipe: Recipe };
  RecipeCreation: {};
  Signup: {};
  Signin: {};
};

const Stack = createStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['https://loving-kowalevski-577e95.netlify.app', 'rustipe://'],
  config: {
    screens: {
      Recipes: 'recipes',
      Recipe: 'recipes/:id',
      RecipeCreation: 'recipes/create',
      Signup: 'signup',
      Signin: 'signin',
    },
  },
};

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const [isSignIn, setIsSignIn] = React.useState(false);

  const setup = async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_NAME);
    setIsSignIn(!!token);
  };

  if (!isReady) {
    return (
      <AppLoading startAsync={setup} onFinish={() => setIsReady(true)} onError={console.warn} />
    );
  }

  return (
    <UiProvider>
      <ApolloProvider client={client}>
        <NavigationContainer linking={linking} ref={navigationRef}>
          <Stack.Navigator headerMode="none" initialRouteName={isSignIn ? 'Recipes' : 'Signup'}>
            <Stack.Screen name="Recipes" component={RecipesList} />
            <Stack.Screen name="Signup" component={UserSignup} />
            <Stack.Screen name="Recipe" component={RecipesDetail} />
            <Stack.Screen name="RecipeCreation" component={RecipesCreate} />
            <Stack.Screen name="Signin" component={UserSignin} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </UiProvider>
  );
}
