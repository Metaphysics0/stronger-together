import React, { useState } from 'react';
import {
  TouchableOpacity,
  TextInput,
  Image,
  View,
  StyleSheet,
  Button,
  Switch,
  Text,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { createGroup } from '@/services/db.service';

// Define the shape of our form state
interface GroupFormState {
  groupName: string;
  description: string;
  image: string | null;
  visibility: 'public' | 'private';
}

export default function CreateGroupForm() {
  // Create a single state object for the form
  const [formState, setFormState] = useState<GroupFormState>({
    groupName: '',
    description: '',
    visibility: 'public',
    image: null,
  });

  // Function to update form state
  const updateFormState = (
    field: keyof GroupFormState,
    value: string | null
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      updateFormState('image', result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    createGroup(formState);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={pickImage}>
        {formState.image ? (
          <Image source={{ uri: formState.image }} style={styles.image} />
        ) : (
          <FontAwesome name="camera" size={24} color="#3B82F6" />
        )}
      </TouchableOpacity>
      <TextInput
        style={{ ...styles.input, marginBottom: 10 }}
        value={formState.groupName}
        onChangeText={(text) => updateFormState('groupName', text)}
        placeholder="Enter group name"
        placeholderTextColor="#9ca3af"
      />
      <TextInput
        style={styles.input}
        value={formState.description}
        onChangeText={(text) => updateFormState('description', text)}
        placeholder="Enter group description"
        placeholderTextColor="#9ca3af"
      />
      <View style={styles.visibilityContainer}>
        <Text>Public</Text>
        <Switch
          value={formState.visibility === 'public'}
          onValueChange={(value) =>
            updateFormState('visibility', value ? 'public' : 'private')
          }
        />
      </View>
      <Button title="Create Group" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#94b8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: { width: 50, height: 50, borderRadius: 100 },
  input: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  visibilityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
