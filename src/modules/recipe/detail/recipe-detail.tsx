import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import {
  Paragraph,
  Surface,
  Text,
  useTheme,
  Chip,
  ActivityIndicator,
  Title,
} from 'react-native-paper';
import { useMediaQuery } from 'react-responsive';
import { useQuery } from '@apollo/client';

import { GetRecipeData, GetRecipeVars, GET_RECIPE } from './recipe-detail-query';
import type { RecipeDetailProps } from './screen';
import type Recipe from '../models/recipe';
import useDimension from '../../hooks/useDimension';

export default function RecipeDetailContainer({ route, navigation }: RecipeDetailProps) {
  const { id } = route.params;
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
    },
    contentContainerStyle: {
      alignItems: 'center',
    },
  });

  const { loading, data, refetch, error } = useQuery<GetRecipeData, GetRecipeVars>(GET_RECIPE, {
    variables: { id },
  });
  const recipe = data?.getRecipe;

  let content = <ActivityIndicator style={defaultStyles.loader} />;
  if (error != null) {
    content = <RecipeDetailError message={error.message} />;
  } else if (!loading && recipe != null) {
    content = <RecipeDetail route={route} navigation={navigation} recipe={recipe} />;
  }
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              refetch({
                id,
              });
            }}
          />
        }
      >
        {content}
      </ScrollView>
    </View>
  );
}
function RecipeDetailError({ message }: Readonly<{ message: string }>) {
  return (
    <View style={defaultStyles.errorContainer}>
      <Title style={defaultStyles.errorTitle}>{message}</Title>
      <Text>Oups, Something did not go as planned.</Text>
    </View>
  );
}

function RecipeDetail({ recipe, navigation }: RecipeDetailProps & Readonly<{ recipe: Recipe }>) {
  const { colors } = useTheme();
  const { width, height } = useDimension();
  const isMobile = useMediaQuery({
    maxWidth: 500,
  });

  const styles = StyleSheet.create({
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
      width,
      height: height / 3,
      resizeMode: 'contain',
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
    <>
      {recipe?.imageUrl ? (
        <TouchableHighlight
          onPress={() => navigation.navigate('Image', { imageUrl: recipe.imageUrl! })}
        >
          <Image style={styles.image} source={{ uri: recipe.imageUrl }} />
        </TouchableHighlight>
      ) : null}

      <View style={styles.main}>
        <View style={styles.ingredientsContainer}>{recipe && <Ingredients recipe={recipe} />}</View>
        <View style={styles.instructionsContainer}>
          {recipe && recipe.description && (
            <Paragraph style={styles.description}>{recipe.description}</Paragraph>
          )}
          {recipe && <Instructions recipe={recipe} />}
        </View>
      </View>
    </>
  );
}

const Ingredients = ({ recipe }: Readonly<{ recipe: Recipe }>) => (
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

const Instructions = ({ recipe }: Readonly<{ recipe: Recipe }>) => (
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

const defaultStyles = StyleSheet.create({
  errorContainer: {
    padding: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTitle: {
    marginBottom: 20,
  },
  loader: {
    padding: 60,
  },
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
