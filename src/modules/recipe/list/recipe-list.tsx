import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import Item from './components/list-item';
import type Recipe from '../models/recipe';
import type { RecipeListProps } from './screen';

export default function RecipeList({ navigation }: RecipeListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
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
