import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from 'firebase/auth';
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage();

// getRedirectResult(auth)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access Google APIs.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;

//     // The signed-in user info.
//     const user = result.user;
//     console.log('USER', user);
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   })
//   .catch((error) => {
//     console.log('ERROR', error);

//     // Handle Errors here.
//     const errorCode = error?.code;
//     const errorMessage = error?.message;
//     // The email of the user's account used.
//     const email = error?.customData?.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     console.log('credential', credential);
//     // ...
//   });
