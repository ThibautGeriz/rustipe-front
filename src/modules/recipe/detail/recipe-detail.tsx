import React from 'react';
import { StyleSheet, ScrollView, Image, Dimensions, View } from 'react-native';
import { Paragraph, Surface, Text, useTheme, Chip } from 'react-native-paper';
import { useMediaQuery } from 'react-responsive';

import type { RecipeDetailProps } from './screen';
import type Recipe from '../models/recipe';

const { width: viewWidth, height: viewHeight } = Dimensions.get('window');

interface IngredientsProps {
  recipe: Recipe;
}

const Ingredients = ({ recipe }: IngredientsProps) => (
  <>
    <View style={defaultStyles.metadata}>
      {recipe.recipeYield && (
        <Chip mode="outlined" style={defaultStyles.chip} icon="buffer">
          {recipe.recipeYield}
        </Chip>
      )}
      <View style={defaultStyles.timingContainer}>
        {recipe.prepTimeInMinute && (
          <Chip style={defaultStyles.timing} icon="knife">
            {recipe.prepTimeInMinute} min
          </Chip>
        )}
        {recipe.prepTimeInMinute && recipe.prepTimeInMinute && (
          <View style={defaultStyles.timingDivider} />
        )}
        {recipe.cookTimeInMinute && (
          <Chip style={defaultStyles.timing} icon="toaster-oven">
            {recipe.cookTimeInMinute} min
          </Chip>
        )}
      </View>
    </View>
    {recipe.ingredients && (
      <Surface style={defaultStyles.ingredients}>
        {recipe.ingredients.map((ingredient, index) => (
          <Text
            // eslint-disable-next-line react/no-array-index-key
            key={`ingredient${index}`}
            testID={`ingredient${index}`}
            style={defaultStyles.ingredient}
          >
            - {ingredient}
          </Text>
        ))}
      </Surface>
    )}
  </>
);

interface InstructionsProps {
  recipe: Recipe;
}

const Instructions = ({ recipe }: InstructionsProps) => (
  <>
    {recipe.instructions.map((instruction, index) => (
      <Paragraph
        style={defaultStyles.instruction}
        // eslint-disable-next-line react/no-array-index-key
        key={`instruction${index}`}
        testID={`instruction${index}`}
      >
        {index + 1}. {instruction}
      </Paragraph>
    ))}
  </>
);

export default function RecipeDetail({ route }: RecipeDetailProps) {
  const { recipe } = route.params;
  const { colors } = useTheme();
  const isMobile = useMediaQuery({
    maxWidth: 500,
  });

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    main: {
      flexDirection: isMobile ? 'column' : 'row',
      maxWidth: 900,
    },
    ingredientsContainer: {
      margin: 10,
      flexDirection: 'column',
      flex: isMobile ? undefined : 1,
    },
    instructionsContainer: {
      margin: 10,
      flexDirection: 'column',
      flex: isMobile ? undefined : 3,
    },
    image: {
      width: viewWidth,
      height: viewHeight / 3,
    },
    header: {
      flexDirection: 'row',
    },
    description: {
      alignSelf: 'stretch',
      flexWrap: 'wrap',
      borderLeftColor: colors.primary,
      borderLeftWidth: 5,
      padding: 10,
      marginBottom: 10,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {recipe.imageUrl ? <Image style={styles.image} source={{ uri: recipe.imageUrl }} /> : null}

      <View style={styles.main}>
        <View style={styles.ingredientsContainer}>
          <Ingredients recipe={recipe} />
        </View>
        <View style={styles.instructionsContainer}>
          {recipe.description && (
            <Paragraph style={styles.description}>{recipe.description}</Paragraph>
          )}
          <Instructions recipe={recipe} />
        </View>
      </View>
    </ScrollView>
  );
}

const defaultStyles = StyleSheet.create({
  ingredients: {
    padding: 10,
  },
  ingredient: {
    marginBottom: 3,
  },
  instruction: {
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  metadata: {},
  timingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  timing: {
    flexDirection: 'row',
    borderWidth: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  timingDivider: {
    borderLeftWidth: 1,
    borderColor: 'white',
  },
  chip: {
    margin: 3,
  },
  footer: {
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 900,
    flexDirection: 'row',
  },
  link: {
    textDecorationLine: 'underline',
  },
});
