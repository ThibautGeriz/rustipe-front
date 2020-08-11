import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Title, Button } from 'react-native-paper';

import ImportModalVisible from './import-modal';
import type { RecipeListProps } from '../screen';

export default function NoRecipe({ navigation }: RecipeListProps) {
  const [isImportModalVisible, setImportModalVisible] = React.useState(false);
  const onImportModalVisibilityToggle = () => setImportModalVisible(!isImportModalVisible);
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Hi there,</Title>
      <Text style={styles.text}>Look like, you do not have any recipes just yet.</Text>
      <Text style={styles.text}>
        This app enables you to store your recipes in one single place
      </Text>

      <Text style={styles.text}>
        You can either add one manually or import it from a URL of your favorite website.
      </Text>
      <View style={styles.actions}>
        <Button
          testID="importButton"
          mode="contained"
          icon="link"
          style={styles.button}
          onPress={() => onImportModalVisibilityToggle()}
        >
          Import
        </Button>
        <Button
          testID="addButton"
          mode="contained"
          icon="plus"
          style={styles.button}
          onPress={() => navigation.navigate('RecipeCreation', {})}
        >
          Add
        </Button>
      </View>
      <ImportModalVisible
        visible={isImportModalVisible}
        onDismiss={onImportModalVisibilityToggle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { marginBottom: 20, textAlign: 'center' },
  text: { marginBottom: 15, textAlign: 'center' },
  actions: { flexDirection: 'row' },
  button: { margin: 10 },
});
