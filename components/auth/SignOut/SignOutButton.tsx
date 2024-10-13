import { useSession } from '@/providers/SessionProvider';
import { Button } from 'react-native';

export default function SignOutButton() {
  const { signOut } = useSession();
  return <Button title="Sign Out" onPress={signOut} />;
}
