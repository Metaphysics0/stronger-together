import { Slot } from 'expo-router';
import { SessionProvider } from '@/providers/SessionProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureGoogleSignIn } from '@/services/google-sign-in.service';
export default function RootLayout() {
  const queryClient = new QueryClient();

  configureGoogleSignIn();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </QueryClientProvider>
  );
}
