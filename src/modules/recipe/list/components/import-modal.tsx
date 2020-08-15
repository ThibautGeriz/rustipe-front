import * as React from 'react';
import { StyleSheet, View, Clipboard, TextInput as NativeTextInput } from 'react-native';
import {
  Modal,
  Portal,
  TextInput,
  Button,
  ActivityIndicator,
  HelperText,
} from 'react-native-paper';
import { gql, useMutation } from '@apollo/client';

import { GET_MY_RECIPES, GetMyRecipeData, GetMyRecipeVars } from '../recipe-list-query';

export const IMPORT_RECIPE = gql`
  mutation($url: String!) {
    importRecipe(url: $url) {
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

export interface RecipeImportModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const ImportModal = ({ visible, onDismiss }: RecipeImportModalProps) => {
  const [text, setText] = React.useState('');
  const textInput = React.useRef<NativeTextInput | null>(null);

  React.useEffect(() => {
    const getClipboardContent = async () => {
      const content = await Clipboard.getString();
      if ((content.startsWith('https://') || content.startsWith('http://')) && text === '') {
        setText(content);
      }
    };
    getClipboardContent();
  }, [visible]);

  const onError = () => {
    if (textInput.current != null) {
      textInput.current!.blur();
    }
  };
  const onCompleted = () => {
    setText('');
    onDismiss();
  };

  const [importRecipe, { loading, error: mutationError }] = useMutation(IMPORT_RECIPE, {
    onError,
    onCompleted,
    update(cache, { data }) {
      const cacheContent = cache.readQuery<GetMyRecipeData, GetMyRecipeVars>({
        query: GET_MY_RECIPES,
      });
      if (!cacheContent) {
        return;
      }
      cache.writeQuery({
        query: GET_MY_RECIPES,
        data: { getMyRecipes: cacheContent.getMyRecipes.concat([data.importRecipe]) },
      });
    },
  });

  return (
    <Portal>
      <Modal contentContainerStyle={styles.modal} visible={visible} onDismiss={onDismiss}>
        <View>
          <TextInput
            placeholder="https://..."
            autoFocus
            error={!!mutationError && text !== ''}
            ref={textInput}
            textContentType="URL"
            label="Url"
            value={text}
            onChangeText={(t: string) => setText(t)}
          />
          <HelperText type="error" visible={!!mutationError && text !== ''}>
            {mutationError ? mutationError.message : undefined}
          </HelperText>
        </View>
        {loading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <View style={styles.buttons}>
            <Button mode="outlined" style={styles.button} onPress={() => setText('')}>
              Clear
            </Button>
            <Button
              style={styles.button}
              mode="contained"
              onPress={() => {
                importRecipe({ variables: { url: text } });
              }}
            >
              Import
            </Button>
          </View>
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 10,
  },
  loader: {
    margin: 10,
  },
});
export default ImportModal;
