import React from 'react';
import { StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Paragraph, Surface, Text } from 'react-native-paper';

import type { RecipeDetailProps } from './screen';

const { width: viewWidth, height: viewHeight } = Dimensions.get('window');

export default function RecipeDetail({ route }: RecipeDetailProps) {
  const { recipe } = route.params;
  return (
    <ScrollView style={styles.container}>
      {recipe.imageUrl ? <Image style={styles.image} source={{ uri: recipe.imageUrl }} /> : null}
      <Surface style={styles.ingredients}>
        {recipe.ingredients.map((ingredient, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Text key={`ingredient${index}`} testID={`ingredient${index}`}>
            - {ingredient}
          </Text>
        ))}
      </Surface>
      {recipe.instructions.map((instruction, index) => (
        <Paragraph
          style={styles.instruction}
          // eslint-disable-next-line react/no-array-index-key
          key={`instruction${index}`}
          testID={`instruction${index}`}
        >
          {index + 1}. {instruction}
        </Paragraph>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ingredients: {
    margin: 20,
    padding: 5,
  },
  instruction: {
    margin: 10,
  },
  image: {
    width: viewWidth,
    height: viewHeight / 3,
  },
});
