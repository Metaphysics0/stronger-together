import React, { useState } from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

export default function ImagePickerGroup() {
  const [image, setImage] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('Group Name');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <View style={styles.iconContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <FontAwesome name="camera" size={24} color="#3B82F6" />
          )}
        </View>
        <Text style={styles.text}>{groupName}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.previewImage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    color: '#E5E7EB',
    fontSize: 16,
    fontWeight: '500',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
});
