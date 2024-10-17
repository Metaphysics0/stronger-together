import GoogleSignInButton from '@/components/auth/SignIn/Providers/Google/Button';
import SignInWithEmailAndPasswordButton from '@/components/auth/SignIn/Providers/Email/Button';
import { Footer } from '@/components/Footer';
import { StyleSheet, Text, View } from 'react-native';
import { useSignInWithEmailFormStore } from '@/hooks/stores/useSignInWithEmailFormStore';
import SignInWithEmailForm from '@/components/auth/SignIn/Providers/Email/Form';

export default function SignIn() {
  const { formActiveStates } = useSignInWithEmailFormStore();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Stronger Together 💪</Text>

        {!formActiveStates.signIn && !formActiveStates.signUp && (
          <View>
            <GoogleSignInButton />
            <Text style={styles.orText}>Or</Text>
            <SignInWithEmailAndPasswordButton />
          </View>
        )}

        {formActiveStates.signUp ||
          (formActiveStates.signIn && <SignInWithEmailForm />)}
      </View>
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
  orText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#A9A9A9',
    marginVertical: 5,
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
});
