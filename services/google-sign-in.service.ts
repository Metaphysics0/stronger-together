import { GoogleSignin } from '@react-native-google-signin/google-signin';

function configureGoogleSignIn() {
  try {
    GoogleSignin.configure();
  } catch (error) {
    console.log('error configuring google sign in', error);
  }
}

export { configureGoogleSignIn };
