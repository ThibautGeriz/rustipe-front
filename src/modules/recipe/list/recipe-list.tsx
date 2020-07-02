import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { ActivityIndicator, Text } from 'react-native-paper';

import Item from './components/list-item';
import type Recipe from '../models/recipe';
import type { RecipeListProps } from './screen';

export const GET_MY_RECIPES = gql`
  query {
    getMyRecipes(userId: $userId) {
      title
      instructions
      ingredients
    }
  }
`;

export default function RecipeList({ navigation }: RecipeListProps) {
  const { loading, error, data } = useQuery(GET_MY_RECIPES, {
    variables: { userId: 'b8427f3a-ac40-4b62-9fe2-688b3b014160' },
  });

  if (loading) return <ActivityIndicator animating data-testid="ActivityIndicator" />;
  if (error) return <Text>{error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data-testid="FlatList"
        data={(data || {}).getMyRecipes || []}
        renderItem={({ item: recipe }: any) => (
          <Item
            key={recipe.title}
            recipe={recipe}
            onSelectRecipe={() => navigation.navigate('Recipe', { recipe })}
          />
        )}
        keyExtractor={(item: Recipe) => item.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const recipes: Array<Recipe> = [
  {
    title: 'Lemon pie',
    instructions: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies facilisis ultrices. Cras eget risus at urna rhoncus pharetra. Integer.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies facilisis ultrices. Cras eget risus at urna rhoncus pharetra. Integer.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies facilisis ultrices. Cras eget risus at urna rhoncus pharetra. Integer.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies facilisis ultrices. Cras eget risus at urna rhoncus pharetra. Integer.',
    ],
    ingredients: ['3 lemons', '150g butter', '250g flour', '3 eggs', '150g sugar'],
  },
  { title: 'Cannelé', ingredients: [], instructions: [] },
];
