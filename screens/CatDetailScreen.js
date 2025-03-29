import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CatDetailScreen = ({ route }) => {
  const { cat } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cat.name}</Text>
      <Text>{cat.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CatDetailScreen;