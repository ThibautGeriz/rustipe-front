import React from 'react';
import { StyleSheet, View, RefreshControl, Dimensions } from 'react-native';
import {
  TextInput,
  Subheading,
  Button,
  Surface,
  Divider,
  ActivityIndicator,
  Snackbar,
  HelperText,
} from 'react-native-paper';
import { gql, useMutation, useQuery } from '@apollo/client';

import PhotoUploader from '../components/photo-uploader';
import { KeyboardAwareScrollView } from '../../components/react-native-keyboard-aware-scroll-view';
import { GET_MY_RECIPES, GetMyRecipeData, GetMyRecipeVars } from '../list/recipe-list-query';
import MultiInputText from '../components/multi-inputtext';
import { GetRecipeData, GetRecipeVars, GET_RECIPE } from '../detail/recipe-detail-query';
import type Recipe from '../models/recipe';

import type { RecipeEditionProps } from './screen';

const { width: viewWidth, height: viewHeight } = Dimensions.get('window');

export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe(
    $id: String!
    $title: String!
    $description: String
    $imageUrl: String
    $recipeYield: String
    $category: String
    $cuisine: String
    $cookTimeInMinute: Int
    $prepTimeInMinute: Int
    $instructions: [String!]!
    $ingredients: [String!]!
    $importedFrom: String
  ) {
    updateRecipe(
      id: $id
      newRecipe: {
        title: $title
        description: $description
        recipeYield: $recipeYield
        category: $category
        cuisine: $cuisine
        cookTimeInMinute: $cookTimeInMinute
        prepTimeInMinute: $prepTimeInMinute
        instructions: $instructions
        ingredients: $ingredients
        importedFrom: $importedFrom
        imageUrl: $imageUrl
      }
    ) {
      id
      title
      description
      imageUrl
      recipeYield
      category
      cuisine
      cookTimeInMinute
      prepTimeInMinute
      instructions
      ingredients
      importedFrom
    }
  }
`;

export default function RecipeEdit({ navigation, route }: RecipeEditionProps) {
  const { id } = route.params;
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState<string | undefined | null>(undefined);
  const [recipeYield, setRecipeYield] = React.useState<string | undefined | null>(undefined);
  const [category, setCategory] = React.useState<string | undefined | null>(undefined);
  const [cuisine, setCuisine] = React.useState<string | undefined | null>(undefined);
  const [cookTimeInMinute, setCookTimeInMinute] = React.useState<number | undefined | null>(
    undefined,
  );
  const [prepTimeInMinute, setPrepTimeInMinute] = React.useState<number | undefined | null>(
    undefined,
  );
  const [instructions, setInstructions] = React.useState<string[]>([]);
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const [visible, setVisible] = React.useState(false);
  const [titleError, setTitleError] = React.useState<string>('');
  const onDismissSnackBar = () => setVisible(false);
  const onPhotoUploding = () => null;
  const onPhotoUploadError = () => null;
  const onError = () => {
    setVisible(true);
  };

  const { data, loading, refetch } = useQuery<GetRecipeData, GetRecipeVars>(GET_RECIPE, {
    variables: { id },
    onCompleted: ({ getRecipe }: GetRecipeData) => {
      setTitle(getRecipe.title);
      setDescription(getRecipe.description);
      setInstructions(getRecipe.instructions);
      setIngredients(getRecipe.ingredients);
      setRecipeYield(getRecipe.recipeYield);
      setCategory(getRecipe.category);
      setCuisine(getRecipe.cuisine);
      setCookTimeInMinute(getRecipe.cookTimeInMinute);
      setPrepTimeInMinute(getRecipe.prepTimeInMinute);
      setRecipeYield(getRecipe.recipeYield);
      setImageUrl(getRecipe.imageUrl ?? null);
    },
  });

  const [updateRecipe, { loading: mutationLoading, error: mutationError }] = useMutation(
    UPDATE_RECIPE,
    {
      onError,
      update(cache, { data: result }) {
        cache.writeQuery({
          query: GET_RECIPE,
          variables: { id },
          data: { getRecipe: result.updateRecipe },
        });
        try {
          const cacheContent = cache.readQuery<GetMyRecipeData, GetMyRecipeVars>({
            query: GET_MY_RECIPES,
          });
          if (!cacheContent) {
            return;
          }
          cache.writeQuery({
            query: GET_MY_RECIPES,
            data: {
              getMyRecipes: cacheContent.getMyRecipes.map((r: Recipe) => {
                if (r.id === id) {
                  return result.updateRecipe;
                }
                return r;
              }),
            },
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      },
    },
  );

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
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
        <View>
          <PhotoUploader
            style={styles.photoUploader}
            onPhotoUploding={onPhotoUploding}
            onPhotoUploded={setImageUrl}
            onPhotoUploadError={onPhotoUploadError}
            url={imageUrl}
          />
          <TextInput
            testID="titleInput"
            error={!!titleError}
            label="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <HelperText type="error" visible={!!titleError}>
            {titleError}
          </HelperText>
        </View>
        <TextInput
          testID="descriptionInput"
          label="Description"
          value={description || ''}
          multiline
          numberOfLines={2}
          onChangeText={(text) => {
            if (text !== '') {
              setDescription(text);
            } else {
              setDescription(null);
            }
          }}
        />
        <TextInput
          testID="recipeYieldInput"
          label="Yield"
          placeholder="4 persons"
          value={recipeYield || ''}
          onChangeText={(text) => {
            if (text !== '') {
              setRecipeYield(text);
            } else {
              setRecipeYield(null);
            }
          }}
        />
        <TextInput
          testID="categoryInput"
          label="Category"
          placeholder="Main, dessert"
          value={category || ''}
          onChangeText={(text) => {
            if (text !== '') {
              setCategory(text);
            } else {
              setCategory(null);
            }
          }}
        />
        <TextInput
          testID="cuisineInput"
          label="Cuisine"
          placeholder="Italian, Asian"
          value={cuisine || ''}
          onChangeText={(text) => {
            if (text !== '') {
              setCuisine(text);
            } else {
              setCuisine(null);
            }
          }}
        />
        <View style={styles.timingContainer}>
          <TextInput
            testID="prepTimeInMinuteInput"
            label="Preparation time (min)"
            keyboardType="number-pad"
            style={styles.timing}
            value={String(prepTimeInMinute)}
            onChangeText={(text) => setPrepTimeInMinute(Number.parseInt(text, 10))}
          />
          <TextInput
            testID="cookTimeInMinuteInput"
            label="Cooking time (min)"
            keyboardType="number-pad"
            style={styles.timing}
            value={String(cookTimeInMinute)}
            onChangeText={(text) => setCookTimeInMinute(Number.parseInt(text, 10))}
          />
        </View>
        <Surface style={styles.ingredients}>
          <Subheading>Ingredients</Subheading>
          <MultiInputText
            data={ingredients}
            setData={setIngredients}
            inputProps={{ dense: true, style: styles.instructionsInput, multiline: true }}
            placeholder="Ingredient"
          />
        </Surface>

        <Subheading>Instructions</Subheading>
        <MultiInputText
          data={instructions}
          setData={setInstructions}
          inputProps={{
            dense: true,
            multiline: true,
            numberOfLines: 2,
            style: styles.instructionsInput,
          }}
          placeholder="Instruction"
        />
        <Divider style={styles.divider} />
        {mutationLoading || (
          <Button
            disabled={loading}
            testID="save-button"
            icon="content-save"
            compact={false}
            mode="contained"
            style={styles.saveButton}
            onPress={async () => {
              if (!title) {
                setTitleError('Title cannot be empty');
                setVisible(true);
                return;
              }
              await updateRecipe({
                variables: {
                  ...data?.getRecipe,
                  title,
                  description,
                  recipeYield,
                  category,
                  cuisine,
                  cookTimeInMinute,
                  prepTimeInMinute,
                  instructions,
                  ingredients,
                  imageUrl,
                },
              });

              navigation.navigate('Recipe', { id });
            }}
          >
            Save
          </Button>
        )}
        {!mutationLoading || <ActivityIndicator animating data-testid="ActivityIndicator" />}
      </KeyboardAwareScrollView>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
        {mutationError && mutationError.message ? mutationError.message : undefined}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  ingredients: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  saveButton: { marginBottom: 20 },
  ingredientsInput: {
    margin: 2,
  },
  divider: { marginTop: 15, marginBottom: 15 },
  instructionsInput: {
    margin: 2,
  },
  timingContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: 'red',
  },
  timing: {
    flex: 1,
  },
  photoUploader: {
    margin: 5,
    width: viewWidth - 30,
    height: viewHeight / 3,
  },
});
