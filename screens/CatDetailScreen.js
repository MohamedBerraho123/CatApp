// screens/CatDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const CatDetailScreen = ({ route }) => {
  const { breed } = route.params;

  return (
    <ScrollView style={styles.container}>
      {breed.imageUrl && <Image source={{ uri: breed.imageUrl }} style={styles.image} />}
      <Text style={styles.title}>{breed.name}</Text>
      <Text style={styles.description}>{breed.description}</Text>
      <Text style={styles.info}>Origin: {breed.origin}</Text>
      <Text style={styles.info}>Temperament: {breed.temperament}</Text>
      <Text style={styles.info}>Life Span: {breed.life_span} years</Text>
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
