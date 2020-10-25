import * as React from 'react';
import { Share, Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GetRecipeData, GetRecipeVars, GET_RECIPE } from './recipe-detail-query';

import { GET_MY_RECIPES, GetMyRecipeData, GetMyRecipeVars } from '../list/recipe-list-query';
import type { RecipeDetailProps } from './screen';
import type Recipe from '../models/recipe';

export const DELETE_RECIPE = gql`
  mutation($id: String!) {
    deleteRecipe(id: $id)
  }
`;

const isWeb = Platform.OS === 'web';

const Header = ({ navigation, route }: RecipeDetailProps) => {
  const { id } = route.params;
  const { data } = useQuery<GetRecipeData, GetRecipeVars>(GET_RECIPE, {
    variables: { id },
  });
  const recipe = data?.getRecipe;
  const [deleteRecipe, { loading }] = useMutation(DELETE_RECIPE, {
    update(cache) {
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
        data: {
          getMyRecipes: cacheContent.getMyRecipes.filter((r: Recipe) => r.id !== id),
        },
      });
    },
  });
  const shareButton = isWeb ? null : (
    <Appbar.Action
      testID="ShareButton"
      color="white"
      icon="share"
      onPress={() => {
        if (recipe == null) {
          return;
        }
        Share.share({
          message: `Check out the recipe: ${recipe.title} from Dish out:

https://loving-kowalevski-577e95.netlify.app/recipes/${recipe.id}`,
          title: 'Dish out',
        });
      }}
    />
  );
  return (
    <Appbar.Header>
      <Appbar.BackAction testID="BackAction" onPress={navigation.goBack} />
      <Appbar.Content title={recipe?.title} />
      {shareButton}
      <Appbar.Action
        testID="EditButton"
        color="white"
        icon="square-edit-outline"
        onPress={() => {
          navigation.navigate('RecipeEdition', { id });
        }}
      />
      <Appbar.Action
        disabled={loading}
        testID="DeleteButton"
        color="white"
        icon="delete"
        onPress={() => {
          deleteRecipe({ variables: { id } }).then(() => {
            navigation.navigate('Recipes', {});
          });
        }}
      />
    </Appbar.Header>
  );
};

export default Header;
