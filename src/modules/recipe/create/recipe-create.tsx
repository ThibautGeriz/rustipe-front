import React from 'react';
import { StyleSheet, View } from 'react-native';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { GET_MY_RECIPES } from '../list/recipe-list';
import type { GetMyRecipeData, GetMyRecipeVars } from '../list/recipe-list';
import MultiInputText from './components/multi-inputtext';

import type { RecipeCreationProps } from './screen';

const ADD_RECIPE = gql`
  mutation CreateRecipe($title: String!, $instructions: [String!]!, $ingredients: [String!]!) {
    createRecipe(
      newRecipe: {
        title: $title
        userId: "b8427f3a-ac40-4b62-9fe2-688b3b014160"
        instructions: $instructions
        ingredients: $ingredients
      }
    ) {
      title
      id
      instructions
      ingredients
    }
  }
`;

export default function RecipeCreate({ navigation }: RecipeCreationProps) {
  const [title, setTitle] = React.useState('');
  const [instructions, setInstructions] = React.useState<string[]>([]);
  const [ingredients, setIngredients] = React.useState<string[]>([]);

  const [visible, setVisible] = React.useState(false);
  const [titleError, setTitleError] = React.useState<string>('');
  const onDismissSnackBar = () => setVisible(false);
  const onError = () => {
    setVisible(true);
  };

  const [addRecipe, { loading, error: mutationError }] = useMutation(ADD_RECIPE, {
    onError,
    update(cache, { data }) {
      const cacheContent = cache.readQuery<GetMyRecipeData, GetMyRecipeVars>({
        query: GET_MY_RECIPES,
      });
      if (!cacheContent) {
        return;
      }
      cache.writeQuery({
        query: GET_MY_RECIPES,
        data: { getMyRecipes: cacheContent.getMyRecipes.concat([data.createRecipe]) },
      });
    },
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View>
          <TextInput
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
            data-testid="save-button"
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
              await addRecipe({ variables: { title, instructions, ingredients } });
              navigation.goBack();
            }}
          />
        )}
        {!loading || <ActivityIndicator animating data-testid="ActivityIndicator" />}
      </KeyboardAwareScrollView>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
        {mutationError && mutationError.message ? mutationError.message : undefined}
        {titleError || undefined}
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
});
