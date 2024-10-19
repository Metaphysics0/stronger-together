import { useStorageState } from '@/hooks/useStorageState';
import { getAuth, signOut, UserCredential } from 'firebase/auth';
import { useContext, createContext, PropsWithChildren } from 'react';

const AuthContext = createContext<{
  signIn: (user: UserCredential) => void;
  signOut: () => void;
  setSession: (session: string) => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (user: UserCredential) => null,

  signOut: () => null,
  setSession: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const auth = getAuth();

  return (
    <AuthContext.Provider
      value={{
        signIn(user: UserCredential) {
          setSession(user.user.uid);
        },
        async signOut() {
          setSession(null);
          await signOut(auth);
        },
        setSession: (session: string) => {
          setSession(session);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
