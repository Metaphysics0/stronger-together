import { Button } from 'react-native';
import { useSignInWithEmailFormStore } from '@/hooks/stores/useSignInWithEmailFormStore';

export default function SignInWithEmailAndPasswordButton() {
  const { formActiveStates, setFormActiveState } =
    useSignInWithEmailFormStore();
  return (
    <Button
      title="Sign in with Email"
      onPress={() => setFormActiveState('signUp', !formActiveStates.signUp)}
    />
  );
}
