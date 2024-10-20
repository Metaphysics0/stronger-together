import { StyleSheet, View, Text } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Groups Page is under development 👷</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scoreboardContainer: {
    flex: 1,
    marginTop: 30,
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
