import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/services/db.service';
import LeaderboardContainer from '@/components/Screens/Leaderboard/Container';
import UserWorkoutStatsModal from '@/components/modals/UserWorkoutStatsModal';
import { useUserStatsModalStore } from '@/hooks/stores/modals/useUserStatsModalStore';

export default function Index() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const { isUserStatsModalActive, setIsUserStatsModalActive } =
    useUserStatsModalStore();

  return (
    <View style={styles.container}>
      {isUserStatsModalActive && <UserWorkoutStatsModal />}
      <LeaderboardContainer />
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
