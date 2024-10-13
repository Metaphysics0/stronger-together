import { Button } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
export default function GoogleSignInButton() {
  const onGoogleButtonPress = async () => {
    try {
      const googleCredential = GoogleAuthProvider.credential();
      console.log('GOOGLE CREDENTIAL', googleCredential);
      const response = await signInWithCredential(auth, googleCredential);
      console.log('RESPONSE', response);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return <Button title="Sign in with Google" onPress={onGoogleButtonPress} />;
}
