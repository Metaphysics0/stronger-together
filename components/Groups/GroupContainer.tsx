import { View, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getGroups } from '@/services/db.service';
import { GroupListItem } from './GroupListItem';
import { Group } from '@/types/group.type';

export default function GroupContainer() {
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  });

  return (
    <View>
      <View style={styles.groupList}>
        {groups?.map((group) => (
          <GroupListItem key={group.group_id} group={group as Group} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groupList: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
});
