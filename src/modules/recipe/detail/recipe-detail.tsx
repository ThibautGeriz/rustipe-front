import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Paragraph, Surface, Text } from 'react-native-paper';

import type { RecipeDetailProps } from './screen';

export default function RecipeDetail({ route }: RecipeDetailProps) {
  const { recipe } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.ingredients}>
        {recipe.ingredients.map((ingredient, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Text key={`ingredient${index}`}>-{ingredient}</Text>
        ))}
      </Surface>
      {recipe.instructions.map((instruction, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Paragraph key={`instruction${index}`}>
          {index + 1}.{instruction}
        </Paragraph>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  ingredients: {
    margin: 10,
    padding: 5,
  },
});
