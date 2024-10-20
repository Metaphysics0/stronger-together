import HomeContainer from '@/components/Screens/Home/Container';
import { useSession } from '@/providers/SessionProvider';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';

export default function Home() {
  const auth = getAuth();
  const { signIn, session, setSession } = useSession();
  useEffect(() => {
    if (auth.currentUser) {
      console.log(
        'inside HomeComponent: - Setting user session from firebase auth'
      );
      setSession(auth.currentUser.uid);
      // signIn(auth.currentUser.);
      // router.push('/(app)/workout');
    }
  }, []);

  return <HomeContainer />;
}
