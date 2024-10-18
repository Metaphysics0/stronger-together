import { StyleSheet, Text, View } from 'react-native';

export default function GroupsScreen() {
  return (
    <View style={styles.container}>
      <Text>Create Groups page</Text>
      <Text>(in development)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
  },
});
