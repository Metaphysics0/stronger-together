import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface AddExerciseModalButtonProps {
  buttonPrefixText?: 'Add' | 'Edit';
  buttonStyles?: Record<string, any>;
  buttonTextStyles?: Record<string, any>;
  onPress?: () => void;
}

export default function AddExerciseModalButton({
  buttonPrefixText = 'Add',
  buttonStyles,
  buttonTextStyles,
  onPress,
}: AddExerciseModalButtonProps) {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...buttonStyles }}
      onPress={onPress}
    >
      <FontAwesome name="plus-circle" size={20} color="#007AFF" />
      <Text style={{ ...styles.buttonText, ...buttonTextStyles }}>
        {buttonPrefixText} Exercise
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.75,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 5,
    color: '#007AFF',
  },
});
