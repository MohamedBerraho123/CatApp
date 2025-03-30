import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        const catsWithImages = await Promise.all(
          response.data.map(async (cat) => {
            if (cat.reference_image_id) {
              const imageResponse = await axios.get(
                `https://api.thecatapi.com/v1/images/${cat.reference_image_id}`
              );
              return { ...cat, imageUrl: imageResponse.data.url };
            }
            return { ...cat, imageUrl: null };
          })
        );
        setCats(catsWithImages);
      } catch (error) {
        console.error('Error fetching cats:', error);
      }
    };
    fetchCats();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('CatDetail', { cat: item })}
    >
      {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Your Cat" onPress={() => navigation.navigate('AddCat')} />
      <FlatList
        data={cats}
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
