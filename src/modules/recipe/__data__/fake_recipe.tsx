import { v4 as uuidv4 } from 'uuid';

import Recipe from '../models/recipe';

function recipe(): Recipe {
  return {
    id: uuidv4(),
    title: 'Lemon pie',
    instructions: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies facilisis ultrices. Cras eget risus at urna rhoncus pharetra. Integer.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies facilisis ultrices. Cras eget risus at urna rhoncus pharetra. Integer.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies facilisis ultrices. Cras eget risus at urna rhoncus pharetra. Integer.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies facilisis ultrices. Cras eget risus at urna rhoncus pharetra. Integer.',
    ],
    ingredients: ['3 lemons', '150g butter', '250g flour', '3 eggs', '150g sugar'],
  };
}

export default recipe;
