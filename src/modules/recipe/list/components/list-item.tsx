import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { List } from 'react-native-paper';

import type Recipe from '../../models/recipe';

const { width: viewWidth } = Dimensions.get('window');

export interface RecipeListItemProps {
  recipe: Recipe;
  onSelectRecipe: () => void | null;
}

export default function RecipeListItem({ recipe, onSelectRecipe }: RecipeListItemProps) {
  return (
    <List.Item
      testID="Item"
      style={styles.container}
      title={recipe.title}
      onPress={onSelectRecipe}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: viewWidth,
  },
});
