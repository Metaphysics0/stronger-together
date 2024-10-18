import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AddExerciseModalProps {
  closeModal: () => void;
}

export default function AddExerciseModal({
  closeModal,
}: AddExerciseModalProps) {
  return (
    <View style={styles.modalContent}>
      <Text style={styles.title}>Add Exercise</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    // height: '50%', // Adjust to desired half-modal height
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    // marginTop: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
