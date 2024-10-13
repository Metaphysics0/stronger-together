import SignOutButton from '@/components/auth/SignOut/SignOutButton';
import { useSession } from '@/providers/SessionProvider';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const session = useSession();
  console.log(session);

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <SignOutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
