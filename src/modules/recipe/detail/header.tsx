import * as React from 'react';
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
      });
      if (!cacheContent) {
        return;
      }
      cache.writeQuery({
        query: GET_MY_RECIPES,
        data: {
          getMyRecipes: cacheContent.getMyRecipes.filter((r: Recipe) => r.id !== id),
        },
      });
    },
  });
  return (
    <Appbar.Header>
      <Appbar.BackAction testID="BackAction" onPress={navigation.goBack} />
      <Appbar.Content title={recipe?.title} />
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
