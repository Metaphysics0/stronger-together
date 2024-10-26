import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Text from '@/components/common/Text';
import { UserWorkout } from '@/types/models/user-workout.type';
import { StrongerTogetherUser } from '@/types/models/stronger-together-user.type';
import { PLACEHOLDER_PROFILE_IMAGE_URL } from '@/constants/placeholder-image-url.constant';
import { getTimestampForFeedListItem } from '@/utils/date/get-timestamp-for-feed-list-item.util';
import { getFriendlyExerciseName } from '@/utils/get-workout-push-notification-message.util';
import { useSession } from '@/providers/SessionProvider';

interface FeedListItemProps {
  workout: UserWorkout;
  user: StrongerTogetherUser;
  onLike: () => void;
}

export default function FeedListItem({
  workout,
  user,
  onLike,
}: FeedListItemProps) {
  const { session: currentUserId } = useSession();

  const isLiked = workout.likedUserIds?.includes(currentUserId!);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.photoUrl || PLACEHOLDER_PROFILE_IMAGE_URL }}
        style={styles.profileImage}
      />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.name}>{user.displayName}</Text>
          <Text style={styles.timestamp}>
            {getTimestampForFeedListItem(workout.timestamp)}
          </Text>
        </View>
        <Text style={styles.workoutText}>
          {workout.exercises
            .map((exercise) =>
              getFriendlyExerciseName({
                exerciseName: exercise.exerciseName,
                count: exercise.count,
              })
            )
            .join(', ')}
        </Text>
        <TouchableOpacity onPress={onLike} style={styles.likeButton}>
          <FontAwesome
            name={isLiked ? 'heart' : 'heart-o'}
            size={20}
            color={isLiked ? '#FF0000' : '#007AFF'}
          />
          <Text style={styles.likeCount}>
            {workout.likedUserIds?.length || 0}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#657786',
  },
  workoutText: {
    marginBottom: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 5,
    color: '#007AFF',
  },
});
