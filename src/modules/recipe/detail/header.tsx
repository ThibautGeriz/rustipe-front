import React, { useState, useEffect } from 'react';
import { Share, Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import { gql, useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

import { GetRecipeData, GetRecipeVars, GET_RECIPE } from './recipe-detail-query';
import { USER_ID_NAME } from '../../user/constants';
import { GET_MY_RECIPES, GetMyRecipeData, GetMyRecipeVars } from '../list/recipe-list-query';
import type { RecipeDetailProps, RecipeDetailScreenNavigationProp } from './screen';
import type Recipe from '../models/recipe';

const Header = ({ navigation, route }: RecipeDetailProps) => {
  const { id } = route.params;
  const { data } = useQuery<GetRecipeData, GetRecipeVars>(GET_RECIPE, {
    variables: { id },
  });
  const recipe = data?.getRecipe;
  const [userId, setUserId] = useState<string | undefined>(undefined);
  useEffect(() => {
    const setup = async () => {
      const userIdFromStorage = await AsyncStorage.getItem(USER_ID_NAME);
      setUserId(userIdFromStorage ?? undefined);
    };
    setup();
  }, [route, navigation]);
  return (
    <Appbar.Header>
      <Appbar.BackAction
        testID="BackAction"
        onPress={() => {
          navigation.navigate('Recipes', {});
        }}
      />
      <Appbar.Content title={recipe?.title} />
      <ShareButton navigation={navigation} recipe={recipe} userId={userId} />
      <EditButton navigation={navigation} recipe={recipe} userId={userId} />
      <DeleteButton navigation={navigation} recipe={recipe} userId={userId} />
      <AddButton navigation={navigation} recipe={recipe} userId={userId} />
    </Appbar.Header>
  );
};

export default Header;

interface ButtonProps {
  recipe: Recipe | undefined;
  userId: string | undefined;
  navigation: RecipeDetailScreenNavigationProp;
}

export const DELETE_RECIPE = gql`
  mutation($id: String!) {
    deleteRecipe(id: $id)
  }
`;

const DeleteButton = ({ recipe, userId, navigation }: ButtonProps) => {
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
          getMyRecipes: cacheContent.getMyRecipes.filter((r: Recipe) => r.id !== recipe?.id),
        },
      });
    },
  });

  if (recipe == null || userId == null || recipe.userId !== userId) {
    return null;
  }
  return (
    <Appbar.Action
      disabled={loading}
      testID="DeleteButton"
      color="white"
      icon="delete"
      onPress={() => {
        deleteRecipe({ variables: { id: recipe.id } }).then(() => {
          navigation.navigate('Recipes', {});
        });
      }}
    />
  );
};

const EditButton = ({ recipe, userId, navigation }: ButtonProps) => {
  if (recipe == null || userId == null || recipe.userId !== userId) {
    return null;
  }
  return (
    <Appbar.Action
      testID="EditButton"
      color="white"
      icon="square-edit-outline"
      onPress={() => {
        navigation.navigate('RecipeEdition', { id: recipe.id });
      }}
    />
  );
};

const isWeb = Platform.OS === 'web';
const ShareButton = ({ recipe }: ButtonProps) => {
  if (recipe == null || isWeb) {
    return null;
  }
  return (
    <Appbar.Action
      testID="ShareButton"
      color="white"
      icon="share"
      onPress={() => {
        Share.share({
          message: `Check out the recipe: ${recipe.title} from Dish out:

https://loving-kowalevski-577e95.netlify.app/recipes/${recipe.id}`,
          title: 'Dish out',
        });
      }}
    />
  );
};

export const COPY_RECIPE = gql`
  mutation($recipeId: String!) {
    copyRecipe(recipeId: $recipeId) {
      id
      userId
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

const AddButton = ({ recipe, userId, navigation }: ButtonProps) => {
  const [copyRecipe, { loading }] = useMutation(COPY_RECIPE, {
    update(cache, { data }) {
      let cacheContent: GetMyRecipeData | null = null;
      try {
        cacheContent = cache.readQuery<GetMyRecipeData, GetMyRecipeVars>({
          query: GET_MY_RECIPES,
          variables: { query: null },
        });
      } catch (ex) {
        // do nothing
      }
      cache.writeQuery({
        query: GET_MY_RECIPES,
        variables: { query: null },
        data: { getMyRecipes: (cacheContent?.getMyRecipes ?? []).concat([data.copyRecipe]) },
      });
    },
  });

  if (recipe == null || recipe.userId === userId) {
    return null;
  }
  return (
    <Appbar.Action
      disabled={loading}
      testID="AddButton"
      color="white"
      icon="plus"
      onPress={async () => {
        if (userId != null) {
          copyRecipe({ variables: { recipeId: recipe.id } }).then((result) => {
            const { id } = result.data.copyRecipe;
            navigation.navigate('Recipe', { id });
          });
        } else {
          navigation.navigate('Signup', {
            redirect: { route: 'Recipe', params: { id: recipe.id } },
          });
        }
      }}
    />
  );
};
