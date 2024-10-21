import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View>
      <Text style={styles.headerText}>Add a Workout! 💪</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
