import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Card, Chip, useTheme } from 'react-native-paper';
import type Recipe from '../../models/recipe';

const { width: viewWidth } = Dimensions.get('window');

export interface RecipeListItemProps {
  recipe: Recipe;
  onSelectRecipe: () => void | null;
}

export default function BigRecipeListItem({ recipe, onSelectRecipe }: RecipeListItemProps) {
  const { colors } = useTheme();
  return (
    <Card testID={`Item-${recipe.id}`} style={styles.container} onPress={onSelectRecipe}>
      <Card.Cover source={{ uri: recipe.imageUrl }} />
      <Card.Title title={recipe.title} subtitle={recipe.description} />
      <Card.Content style={styles.cardContent}>
        <View style={styles.subContent}>
          {recipe.recipeYield && (
            <Chip mode="outlined" style={styles.chip} icon="buffer">
              {recipe.recipeYield}
            </Chip>
          )}
          {recipe.prepTimeInMinute && (
            <Chip mode="outlined" style={styles.chip} icon="knife">
              {recipe.prepTimeInMinute}
            </Chip>
          )}
          {recipe.cookTimeInMinute && (
            <Chip mode="outlined" style={styles.chip} icon="toaster-oven">
              {recipe.cookTimeInMinute}
            </Chip>
          )}
        </View>
        <View style={styles.subContent}>
          {recipe.cuisine && (
            <Chip mode="outlined" style={styles.chip}>
              {recipe.cuisine}
            </Chip>
          )}
          {recipe.category && (
            <Chip
              mode="outlined"
              style={[styles.chip, { borderColor: colors.primary }]}
              textStyle={{ color: colors.primary }}
            >
              {recipe.category}
            </Chip>
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    width: (viewWidth - 10) / 3 - 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  subContent: {
    flexDirection: 'row',
  },
  chip: {
    margin: 3,
  },
});