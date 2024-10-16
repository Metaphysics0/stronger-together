import { Slot } from 'expo-router';
import { SessionProvider } from '@/providers/SessionProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const queryClient = new QueryClient();

  // configureGoogleSignIn();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Slot />
        <Toast />
      </SessionProvider>
    </QueryClientProvider>
  );
}
