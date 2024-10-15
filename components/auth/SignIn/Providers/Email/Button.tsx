import { Button } from 'react-native';
import Form from './Form';
import { useSignInWithEmailFormStore } from '@/hooks/stores/useSignInWithEmailFormStore';

export default function SignInWithEmailButton() {
  const { isSignUpWithEmailFormActive, setIsSignUpWithEmailFormActive } =
    useSignInWithEmailFormStore();
  if (isSignUpWithEmailFormActive) {
    return <Form />;
  }
  return (
    <Button
      title="Sign in with Email"
      onPress={() =>
        setIsSignUpWithEmailFormActive(!isSignUpWithEmailFormActive)
      }
    />
  );
}
