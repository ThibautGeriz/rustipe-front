export default interface Recipe {
  id: string;
  userId: string;
  title: string;
  instructions: string[];
  ingredients: string[];
  imageUrl?: string;
  description?: string;
  recipeYield?: string;
  cuisine?: string;
  category?: string;
  cookTimeInMinute?: number;
  prepTimeInMinute?: number;
  importedFrom?: string;
}
