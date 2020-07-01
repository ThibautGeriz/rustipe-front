import React from 'react';
import { View } from 'react-native';
import RecipeList from './recipe-list';
import Header from './header';

export default (...props: any) => (
  <View style={{ height: '100%', width: '100%' }}>
    <Header />
    <RecipeList {...props} />
  </View>
);
