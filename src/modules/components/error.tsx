import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Title } from 'react-native-paper';

export default function Error({ message }: Readonly<{ message: string }>) {
  return (
    <View style={styles.errorContainer}>
      <Title style={styles.errorTitle}>{message}</Title>
      <Text>Oups, Something did not go as planned.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    padding: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTitle: {
    marginBottom: 20,
  },
});
