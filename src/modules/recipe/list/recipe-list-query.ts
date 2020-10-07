import { gql } from '@apollo/client';
import type Recipe from '../models/recipe';

export interface GetMyRecipeData {
  getMyRecipes: Recipe[];
}

export interface GetMyRecipeVars {
  query: string | null;
}

export const GET_MY_RECIPES = gql`
  query($query: String) {
    getMyRecipes(query: $query) {
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
