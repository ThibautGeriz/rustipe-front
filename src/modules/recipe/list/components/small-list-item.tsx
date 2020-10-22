import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card } from 'react-native-paper';

import useDimension from '../../../hooks/useDimension';
import type Recipe from '../../models/recipe';

export interface RecipeListItemProps {
  recipe: Recipe;
  onSelectRecipe: () => void | null;
}

const SideContentFactory = (recipe: Recipe) => (props: any) =>
  recipe.imageUrl != null ? (
    <Avatar.Image {...props} style={styles.image} size={55} source={{ uri: recipe.imageUrl }} />
  ) : null;

export default function SmallRecipeListItem({ recipe, onSelectRecipe }: RecipeListItemProps) {
  const { width } = useDimension();
  return (
    <Card
      testID={`Item-${recipe.id}`}
      style={[styles.container, { width: width - 10 }]}
      onPress={onSelectRecipe}
    >
      <Card.Title
        title={recipe.title}
        subtitle={recipe.description}
        right={SideContentFactory(recipe)}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
  },
  image: {
    marginRight: 5,
    marginLeft: 5,
  },
});
