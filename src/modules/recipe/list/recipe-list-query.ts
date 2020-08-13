import { gql } from '@apollo/client';
import type Recipe from '../models/recipe';

export interface GetMyRecipeData {
  getMyRecipes: Recipe[];
}

export interface GetMyRecipeVars {}

export const GET_MY_RECIPES = gql`
  query {
    getMyRecipes {
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
