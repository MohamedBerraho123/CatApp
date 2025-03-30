// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        const breedsWithImages = await Promise.all(
          response.data.map(async (breed) => {
            if (breed.reference_image_id) {
              const imageResponse = await axios.get(
                `https://api.thecatapi.com/v1/images/${breed.reference_image_id}`
              );
              return { ...breed, imageUrl: imageResponse.data.url };
            }
            return { ...breed, imageUrl: null };
          })
        );
        setBreeds(breedsWithImages);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };
    fetchBreeds();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('CatDetail', { breed: item })}
    >
      {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={breeds}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },
  title: {
    fontSize: 18,
  },
});

export default HomeScreen;
