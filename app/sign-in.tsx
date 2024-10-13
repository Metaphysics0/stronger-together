import GoogleSignInButton from '@/components/SignIn/GoogleSignInButton';
import { View, Text } from 'react-native';

export default function SignIn() {
  return (
    <View>
      <Text>Sign In</Text>
      <GoogleSignInButton />
    </View>
  );
}
