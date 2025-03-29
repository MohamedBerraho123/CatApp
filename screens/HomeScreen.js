import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const response = await axios.get('https://api.thecatapi.com/v1/breeds');
      setCats(response.data);
    };
    fetchCats();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CatDetail', { cat: item })}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;