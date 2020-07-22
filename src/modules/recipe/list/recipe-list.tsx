import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { Snackbar, FAB, useTheme, Portal } from 'react-native-paper';

import Item from './components/list-item';
import ImportModalVisible from './components/import-modal';
import type Recipe from '../models/recipe';
import type { RecipeListProps } from './screen';
import { GetMyRecipeData, GetMyRecipeVars, GET_MY_RECIPES } from './recipe-list-query';

export default function RecipeList({ navigation }: RecipeListProps) {
  const { colors } = useTheme();
  const [isFabVisible, setFabVisibility] = React.useState(false);
  const onFabVisiblityToggle = () => setFabVisibility(!isFabVisible);
  const [isImportModalVisible, setImportModalVisible] = React.useState(false);
  const onImportModalVisibilityToggle = () => setImportModalVisible(!isImportModalVisible);
  const result = useQuery<GetMyRecipeData, GetMyRecipeVars>(GET_MY_RECIPES);
  const { loading, data, refetch } = result;
  let { error } = result;
  const onDismissSnackBar = () => {
    error = undefined;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        refreshing={loading}
        onRefresh={refetch}
        testID="FlatList"
        data={(data || {}).getMyRecipes || []}
        renderItem={({ item: recipe }: any) => (
          <Item
            key={recipe.id}
            recipe={recipe}
            onSelectRecipe={() => navigation.navigate('Recipe', { id: recipe.id, recipe })}
          />
        )}
        keyExtractor={(item: Recipe) => item.id}
      />
      <Snackbar visible={!!error} onDismiss={onDismissSnackBar}>
        {error && error.message ? error.message : 'Failed'}
      </Snackbar>
      <ImportModalVisible
        visible={isImportModalVisible}
        onDismiss={onImportModalVisibilityToggle}
      />
      <Portal>
        <FAB.Group
          testID="TabGroup"
          accessibilityLabel="Add recipe"
          visible
          open={isFabVisible}
          icon={isFabVisible ? 'food-fork-drink' : 'plus'}
          actions={[
            {
              icon: 'plus',
              accessibilityLabel: 'Add recipe via form',
              onPress: () => navigation.navigate('RecipeCreation', {}),
            },
            {
              icon: 'link',
              label: 'Import',
              accessibilityLabel: 'Import recipe from URL',
              onPress: onImportModalVisibilityToggle,
            },
          ]}
          onStateChange={onFabVisiblityToggle}
        />
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
