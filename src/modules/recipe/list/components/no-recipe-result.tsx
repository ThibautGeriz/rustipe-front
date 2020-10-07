import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function NoRecipeResult() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No results, please update your search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { margin: 50, textAlign: 'center' },
});
