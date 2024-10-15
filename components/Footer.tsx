import { StyleSheet, Text, View } from 'react-native';

export function Footer() {
  return (
    <View>
      <Text style={styles.footerText}>Created with ❤️ by Ryan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerText: {
    color: 'grey',
  },
});
