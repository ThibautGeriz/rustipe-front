import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
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
import { gql, useMutation } from '@apollo/client';

import PhotoUploader from '../components/photo-uploader';
import { KeyboardAwareScrollView } from '../../components/react-native-keyboard-aware-scroll-view';
import { GET_MY_RECIPES, GetMyRecipeData, GetMyRecipeVars } from '../list/recipe-list-query';
import MultiInputText from '../components/multi-inputtext';

import type { RecipeCreationProps } from './screen';

const { width: viewWidth, height: viewHeight } = Dimensions.get('window');

export const ADD_RECIPE = gql`
  mutation CreateRecipe(
    $title: String!
    $instructions: [String!]!
    $ingredients: [String!]!
    $imageUrl: String
  ) {
    createRecipe(
      newRecipe: {
        title: $title
        instructions: $instructions
        ingredients: $ingredients
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

export default function RecipeCreate({ navigation }: RecipeCreationProps) {
  const [title, setTitle] = React.useState('');
  const [instructions, setInstructions] = React.useState<string[]>([]);
  const [ingredients, setIngredients] = React.useState<string[]>([]);

  const [visible, setVisible] = React.useState(false);
  const [titleError, setTitleError] = React.useState<string>('');
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const onPhotoUploding = () => null;
  const onPhotoUploadError = () => null;

  const onDismissSnackBar = () => setVisible(false);
  const onError = () => {
    setVisible(true);
  };

  const [addRecipe, { loading, error: mutationError }] = useMutation(ADD_RECIPE, {
    onError,
    update(cache, { data }) {
      const cacheContent = cache.readQuery<GetMyRecipeData, GetMyRecipeVars>({
        query: GET_MY_RECIPES,
        variables: { query: null },
      });
      if (!cacheContent) {
        return;
      }
      cache.writeQuery({
        query: GET_MY_RECIPES,
        variables: { query: null },
        data: { getMyRecipes: cacheContent.getMyRecipes.concat([data.createRecipe]) },
      });
    },
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <PhotoUploader
          style={styles.photoUploader}
          onPhotoUploding={onPhotoUploding}
          onPhotoUploded={setImageUrl}
          onPhotoUploadError={onPhotoUploadError}
          url={imageUrl}
        />
        <View>
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
        <Surface style={styles.ingredients}>
          <Subheading>Ingredients</Subheading>
          <MultiInputText
            data={ingredients}
            setData={setIngredients}
            inputProps={{ dense: true, style: styles.instructionsInput }}
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
        {loading || (
          <Button
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
              await addRecipe({ variables: { title, instructions, ingredients, imageUrl } });

              navigation.goBack();
            }}
          >
            Save
          </Button>
        )}
        {!loading || <ActivityIndicator animating data-testid="ActivityIndicator" />}
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
  photoUploader: {
    margin: 5,
    width: viewWidth - 30,
    height: viewHeight / 3,
  },
});
