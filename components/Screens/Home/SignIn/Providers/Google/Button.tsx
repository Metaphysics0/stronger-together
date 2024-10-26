import { auth } from '@/firebaseConfig';
import { useSession } from '@/providers/SessionProvider';
import { createUser } from '@/services/db.service';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
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
        await createUser({
          uid: signInResponse.user.uid,
          data: {
            displayName: signInResponse.user.displayName || '',
            email: signInResponse.user.email || '',
            photoUrl: signInResponse.user.photoURL,
            provider: 'google',
          },
        });
        signIn(signInResponse);
        // router.replace('/(app)/workout');
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return <Button title="Sign in with Google" onPress={onGoogleButtonPress} />;
}
