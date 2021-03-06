import { v4 as uuidv4 } from 'uuid';

import Recipe from '../models/recipe';

function recipe(): Recipe {
  return {
    id: uuidv4(),
    title: 'Lemon pie',
    userId: 'user-id-24',
    instructions: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies facilisis ultrices. Cras eget risus at urna rhoncus pharetra. Integer. 1',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies facilisis ultrices. Cras eget risus at urna rhoncus pharetra. Integer. 2',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies facilisis ultrices. Cras eget risus at urna rhoncus pharetra. Integer. 3',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies facilisis ultrices. Cras eget risus at urna rhoncus pharetra. Integer. 4',
    ],
    ingredients: ['3 lemons', '150g butter', '250g flour', '3 eggs', '150g sugar'],
    imageUrl:
      'https://assets.afcdn.com/recipe/20200408/109520_w1024h768c1cx1866cy2800cxt0cyt0cxb3732cyb5600.jpg',
    recipeYield: '4 people',
    description: 'Lorem ipsum dolor sit amet',
    category: 'main',
    cuisine: 'italian',
    cookTimeInMinute: 10,
    prepTimeInMinute: 20,
    importedFrom: 'marmitton.fr',
  };
}

export default recipe;
