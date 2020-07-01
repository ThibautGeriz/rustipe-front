import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Item from './components/list-item';
import type Recipe from '../models/recipe';
import type { RootStackParamList } from '../../../../App';

type DashboardsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Recipes'>;

interface RecipeListProps {
  navigation: DashboardsScreenNavigationProp;
}

export default function RecipeList({ navigation }: RecipeListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={({ item: recipe }: any) => (
          <Item
            key={recipe.title}
            recipe={recipe}
            onSelectRecipe={() => navigation.navigate('Recipes', { recipe })}
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
  { title: 'Lemon Pie', ingredients: [], instructions: [] },
  { title: 'Cannelé', ingredients: [], instructions: [] },
];
