// screens/AddCatScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddCatScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Needed',
        'We need permissions to access your gallery.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name || !size || !description || !imageUri) {
      Alert.alert('Error', 'Please fill all fields and select an image.');
      return;
    }

    const newCat = {
      id: Date.now().toString(),
      name,
      size,
      description,
      imageUrl: imageUri,
    };

    Alert.alert('Success', 'Cat added successfully!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Cat Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter cat name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Size</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter cat size"
        value={size}
        onChangeText={setSize}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter cat description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button title="Select Image" onPress={handlePickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <Button title="Add Cat" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
});

export default AddCatScreen;