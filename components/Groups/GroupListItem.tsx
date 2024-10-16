import { PLACEHOLDER_PROFILE_IMAGE_URL } from '@/constants/placeholder-image-url.constant';
import { cardStyle } from '@/constants/shared-styles.constant';
import { Group } from '@/types/group.type';
import { View, Text, StyleSheet, Image } from 'react-native';

export function GroupListItem({ group }: { group: Group }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: group.image_url || PLACEHOLDER_PROFILE_IMAGE_URL }}
        style={styles.image}
      />
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{group.group_name}</Text>
        <Text style={styles.groupDescription}>{group.description}</Text>
        <Text style={styles.membersCount}>{group.members.length} members</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...cardStyle,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  groupDescription: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  membersCount: {
    fontSize: 14,
    color: 'gray',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
});
