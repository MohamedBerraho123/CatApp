// screens/AddCatScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const AddCatScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
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

    // Here you can handle the new cat object, such as sending it to a backend server
    // or updating a local state or context

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

      <Button title="Select Image" onPress={selectImage} />
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
