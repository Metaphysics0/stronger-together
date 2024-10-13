import { auth } from '@/firebaseConfig';
import { useSession } from '@/providers/SessionProvider';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function SignInWithEmail() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function onEmailChange(text: string) {
    setEmail(text.toLowerCase().trim());
  }

  const handleSignIn = async () => {
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
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="myemail@example.com"
        keyboardType="email-address"
        inputMode="email"
        textContentType="username"
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
      <Button title="Sign In 💪" onPress={handleSignIn} />
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
});
