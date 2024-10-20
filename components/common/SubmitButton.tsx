import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface SubmitButtonProps {
  onSubmit: () => void;
}

export default function SubmitButton({ onSubmit }: SubmitButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onSubmit}>
      <View style={styles.content}>
        <Text style={styles.text}>Submit</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 25,
    // width: '30%',
    width: '100%',
    padding: 23,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    // marginRight: 8,
  },
});
