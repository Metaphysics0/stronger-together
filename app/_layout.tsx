import { Slot } from 'expo-router';
import { SessionProvider } from '@/providers/SessionProvider';
export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
