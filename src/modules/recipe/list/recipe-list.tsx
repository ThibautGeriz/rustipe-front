import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { Snackbar, FAB, useTheme, Portal, Searchbar, ActivityIndicator } from 'react-native-paper';
import { useMediaQuery } from 'react-responsive';

import SmallItem from './components/small-list-item';
import BigItem from './components/big-list-item';
import ImportModalVisible from './components/import-modal';
import NoRecipe from './components/no-recipe';
import NoRecipeResult from './components/no-recipe-result';
import type Recipe from '../models/recipe';
import type { RecipeListProps } from './screen';
import { GetMyRecipeData, GetMyRecipeVars, GET_MY_RECIPES } from './recipe-list-query';
import Error from '../../components/error';

export default function RecipeList({ navigation }: RecipeListProps) {
  const { colors } = useTheme();
  const isMobile = useMediaQuery({
    maxWidth: 900,
  });
  const [isFabVisible, setFabVisibility] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [showSnackBar, setShowSnackBar] = React.useState(false);
  const onFabVisiblityToggle = () => setFabVisibility(!isFabVisible);
  const [isImportModalVisible, setImportModalVisible] = React.useState(false);
  const onImportModalVisibilityToggle = () => setImportModalVisible(!isImportModalVisible);
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null);
  const { loading, data, refetch } = useQuery<GetMyRecipeData, GetMyRecipeVars>(GET_MY_RECIPES, {
    variables: { query: searchQuery },
    onError: (err) => {
      setError(err);
      setShowSnackBar(true);
    },
    onCompleted: () => {
      setError(null);
      setShowSnackBar(false);
    },
  });
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    refetch({ query });
  };

  const onDismissSnackBar = () => {
    setShowSnackBar(false);
  };
  const Item = isMobile ? SmallItem : BigItem;
  const recipies: Recipe[] = (data || {}).getMyRecipes || [];
  let ListEmptyComponent = <NoRecipe navigation={navigation} />;
  if (searchQuery) {
    ListEmptyComponent = <NoRecipeResult />;
  }
  if (loading) {
    ListEmptyComponent = <ActivityIndicator size="large" style={styles.activityIndicator} />;
  }
  if (error) {
    ListEmptyComponent = <Error message={error.message} />;
  }
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Searchbar
        placeholder="Search"
        testID="Searchbar"
        style={styles.searchBox}
        onChangeText={onChangeSearch}
        value={searchQuery || ''}
      />

      <FlatList
        refreshing={loading && recipies.length === 0}
        numColumns={isMobile ? 1 : 3}
        onRefresh={() => refetch({ query: searchQuery })}
        ListEmptyComponent={ListEmptyComponent}
        testID="FlatList"
        data={recipies || []}
        renderItem={({ item: recipe }: any) => (
          <Item
            key={recipe.id}
            recipe={recipe}
            onSelectRecipe={() => navigation.navigate('Recipe', { id: recipe.id })}
          />
        )}
        keyExtractor={(item: Recipe) => item.id}
      />
      <Snackbar
        visible={showSnackBar}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: onDismissSnackBar,
        }}
      >
        {error?.message ?? 'Failed'}
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
  activityIndicator: {
    margin: 50,
  },
  searchBox: {
    margin: 5,
  },
});
