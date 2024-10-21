import CreateGroupContainer from '@/components/Screens/Groups/CreateGroup/CreateGroupContainer';
import { StyleSheet, View } from 'react-native';

export default function GroupsScreen() {
  return (
    <View style={styles.container}>
      <CreateGroupContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
  },
});
