import { gql } from '@apollo/client';
import type Recipe from '../models/recipe';

export interface GetMyRecipeData {
  getMyRecipes: Recipe[];
}

export interface GetMyRecipeVars {}

export const GET_MY_RECIPES = gql`
  query {
    getMyRecipes(userId: "b8427f3a-ac40-4b62-9fe2-688b3b014160") {
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
    }
  }
`;
