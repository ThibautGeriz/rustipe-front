import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import type Recipe from '../../models/recipe';

const { width: viewWidth } = Dimensions.get('window');

export interface RecipeListItemProps {
  recipe: Recipe;
  onSelectRecipe: () => void | null;
}

const SideContentFactory = (recipe: Recipe) => (props: any) =>
  recipe.imageUrl != null ? (
    <Avatar.Image {...props} style={styles.image} size={55} source={{ uri: recipe.imageUrl }} />
  ) : null;

export default function SmallRecipeListItem({ recipe, onSelectRecipe }: RecipeListItemProps) {
  return (
    <Card testID={`Item-${recipe.id}`} style={styles.container} onPress={onSelectRecipe}>
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
    width: viewWidth - 10,
  },
  image: {
    marginRight: 5,
    marginLeft: 5,
  },
});
