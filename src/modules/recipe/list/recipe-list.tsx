import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { Snackbar, FAB } from 'react-native-paper';

import Item from './components/list-item';
import type Recipe from '../models/recipe';
import type { RecipeListProps } from './screen';

export interface GetMyRecipeData {
  getMyRecipes: Recipe[];
}

export interface GetMyRecipeVars {}

export const GET_MY_RECIPES = gql`
  query {
    getMyRecipes(userId: "b8427f3a-ac40-4b62-9fe2-688b3b014160") {
      id
      title
      instructions
      ingredients
    }
  }
`;

export default function RecipeList({ navigation }: RecipeListProps) {
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const onError = () => {
    setVisible(true);
  };

  const { loading, error, data, refetch } = useQuery<GetMyRecipeData, GetMyRecipeVars>(
    GET_MY_RECIPES,
    {
      onError,
    },
  );

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={refetch}
        data-testid="FlatList"
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
      <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
        {error && error.message ? error.message : 'Failed'}
      </Snackbar>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('RecipeCreation', {})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
  },
});
