import GoogleSignInButton from '@/components/auth/SignIn/GoogleSignInButton';
import { Footer } from '@/components/Footer';
import { StyleSheet, Text, View } from 'react-native';

export default function SignIn() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Stronger Together 💪</Text>
        <GoogleSignInButton />
      </View>
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
});
