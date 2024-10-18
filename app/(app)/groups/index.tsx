import { StyleSheet, View } from 'react-native';
import GroupContainer from '@/components/Groups/GroupContainer';

export default function Index() {
  return (
    <View style={styles.container}>
      <GroupContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scoreboardContainer: {
    flex: 1,
    marginTop: 30,
  },
});
