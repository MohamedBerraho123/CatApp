import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const CatDetailScreen = ({ route }) => {
  const { cat } = route.params;

  return (
    <ScrollView style={styles.container}>
      {cat.imageUrl && <Image source={{ uri: cat.imageUrl }} style={styles.image} />}
      <Text style={styles.title}>{cat.name}</Text>
      <Text style={styles.description}>{cat.description}</Text>
      <Text style={styles.info}>Origin: {cat.origin}</Text>
      <Text style={styles.info}>Temperament: {cat.temperament}</Text>
      <Text style={styles.info}>Life Span: {cat.life_span} years</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CatDetailScreen;
