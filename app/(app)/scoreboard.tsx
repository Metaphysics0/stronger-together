import { Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/services/db.service';

export default function Index() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  console.log(users);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 35,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Text>Scoreboard</Text>
      {users?.map((user) => (
        <Text key={user.uid}>{user.displayName}</Text>
      ))}
    </View>
  );
}
