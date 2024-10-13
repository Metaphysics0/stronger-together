import SignInWithEmail from '@/components/auth/SignIn/SignInWithEmail';
import { StyleSheet, Text, View } from 'react-native';

export default function SignIn() {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 35,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Text style={styles.title}>Stronger Together 💪</Text>
      <SignInWithEmail />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
});
