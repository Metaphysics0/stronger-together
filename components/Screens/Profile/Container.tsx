import SignOutButton from '@/components/auth/SignOut/SignOutButton';
import { StyleSheet, View } from 'react-native';

export default function ProfileContainer() {
  return (
    <View style={styles.container}>
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
