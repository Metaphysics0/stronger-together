import { auth } from '@/firebaseConfig';
import { useSession } from '@/providers/SessionProvider';
import { createUser } from '@/services/db.service';
import { router } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from 'react-native';

export default function SignInWithEmail() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const [isSignUpForm, setIsSignUpForm] = useState(false);
  function onEmailChange(text: string) {
    setEmail(text.toLowerCase().trim());
  }

  const handleSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (response.user) {
        await createUser({ uid: response.user.uid, displayName });
        signIn(response);
        router.replace('/');
      }
    } catch (error) {
      console.error('ERROR', error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (response.user) {
        signIn(response);
        router.replace('/');
      }
    } catch (error) {
      console.error('ERROR', error);
    }
  };

  return (
    <View>
      {isSignUpForm && (
        <View>
          <Text style={styles.text}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={displayName}
            onChangeText={setDisplayName}
          />
        </View>
      )}
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="myemail@example.com"
        keyboardType="email-address"
        inputMode="email"
        textContentType="emailAddress"
        numberOfLines={1}
        value={email}
        onChangeText={onEmailChange}
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {isSignUpForm ? (
        <Button title="Sign Up" onPress={handleSignUp} />
      ) : (
        <Button title="Sign In" onPress={handleSignIn} />
      )}

      <View style={styles.signUpContainer}>
        {isSignUpForm ? (
          <Text>Already have an account?</Text>
        ) : (
          <Text>Don't have an account?</Text>
        )}
        <Pressable onPress={() => setIsSignUpForm(!isSignUpForm)}>
          <Text style={styles.signUpButton}>
            {isSignUpForm ? 'Sign In' : 'Sign Up'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 10,
    fontSize: 17,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  signUpContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
