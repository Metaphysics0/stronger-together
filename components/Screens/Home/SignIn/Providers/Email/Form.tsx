import { auth } from '@/firebaseConfig';
import { useSignInWithEmailFormStore } from '@/hooks/stores/useSignInWithEmailFormStore';
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

export default function SignInWithEmailAndPasswordForm() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const {
    clearFormActiveState,
    formActiveStates,
    setSignInFormActiveState,
    setSignUpFormActiveState,
  } = useSignInWithEmailFormStore();

  function onEmailChange(text: string) {
    setEmail(text.toLowerCase().trim());
  }

  const handleSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user) {
        await createUser({ uid: response.user.uid, data: { displayName } });
        signIn(response);
        router.replace('/(app)/workout');
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
        await createUser({ uid: response.user.uid, data: { displayName } });
        signIn(response);
        router.replace('/(app)/workout');
      }
    } catch (error) {
      console.error('ERROR', error);
    }
  };

  return (
    <View>
      {formActiveStates.signUp && (
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
      {formActiveStates.signUp ? (
        <Button title="Sign Up" onPress={handleSignUp} />
      ) : (
        <Button title="Sign In" onPress={handleSignIn} />
      )}

      <View style={styles.signUpContainer}>
        {formActiveStates.signUp ? (
          <Text>Already have an account?</Text>
        ) : (
          <Text>Don't have an account?</Text>
        )}
        <Pressable
          onPress={() => {
            formActiveStates.signUp
              ? setSignInFormActiveState()
              : setSignUpFormActiveState();
          }}
        >
          <Text style={styles.signUpButton}>
            {formActiveStates.signUp ? 'Sign In' : 'Sign Up'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.goBackContainer}>
        <Pressable style={styles.goBackButton} onPress={clearFormActiveState}>
          <Text style={styles.goBackButton}>Go Back?</Text>
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
  goBackContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackButton: {
    marginLeft: 5,
    color: '#A9A9A9',
  },
});
