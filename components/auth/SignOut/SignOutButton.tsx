import { useSession } from '@/providers/SessionProvider';
import { Button } from 'react-native';

export default function SignOutButton() {
  const { signOut: signOutFromSession } = useSession();

  async function handleSignOut() {
    signOutFromSession();
  }
  return <Button title="Sign Out" onPress={handleSignOut} />;
}
