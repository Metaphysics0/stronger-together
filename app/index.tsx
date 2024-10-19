import HomeContainer from '@/components/Screens/Home/Container';
import { useSession } from '@/providers/SessionProvider';
import { router } from 'expo-router';
import { getAuth } from 'firebase/auth';

export default function Home() {
  const auth = getAuth();
  const { session, setSession } = useSession();

  if (auth.currentUser) {
    console.log('HomeComponent: - Setting user session from firebase auth');
    setSession(auth.currentUser.uid);
    router.push('/(app)/workout');
  }
  return <HomeContainer />;
}
