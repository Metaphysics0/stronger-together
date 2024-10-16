import { auth } from '@/firebaseConfig';
import { useSession } from '@/providers/SessionProvider';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Button } from 'react-native';
export default function GoogleSignInButton() {
  const { signIn } = useSession();

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const response = await GoogleSignin.signIn();
      const idToken = response?.data?.idToken;
      const credential = GoogleAuthProvider.credential(idToken);
      const signInResponse = await signInWithCredential(auth, credential);
      if (signInResponse.user) {
        signIn(signInResponse);
        router.replace('/');
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return <Button title="Sign in with Google" onPress={onGoogleButtonPress} />;
}
