import { gql } from '@apollo/client';
import type Recipe from '../models/recipe';

export interface GetRecipeData {
  getRecipe: Recipe;
}

export interface GetRecipeVars {
  id: String;
}

export const GET_RECIPE = gql`
  query($id: String!) {
    getRecipe(id: $id) {
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
