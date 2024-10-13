import SignInWithEmail from '@/components/SignIn/SignInWithEmail';
import { View } from 'react-native';

export default function SignIn() {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 35,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <SignInWithEmail />
    </View>
  );
}
