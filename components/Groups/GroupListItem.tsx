import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PLACEHOLDER_PROFILE_IMAGE_URL } from '@/constants/placeholder-image-url.constant';
import { Group } from '@/types/group.type';

export function GroupListItem({
  group,
  onJoin,
  onDecline,
}: {
  group: Group;
  onJoin?: () => void;
  onDecline?: () => void;
}) {
  const memberPreviewCount = 5;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: group.image_url || PLACEHOLDER_PROFILE_IMAGE_URL }}
        style={styles.groupImage}
      />
      <View style={styles.contentContainer}>
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{group.group_name}</Text>
          <Text style={styles.membersCount}>
            {group.members.length} members
          </Text>
        </View>
        <View style={styles.memberPreview}>
          {group.members.slice(0, memberPreviewCount).map((member, index) => (
            <Image
              key={member.id}
              source={{
                uri: member.image_url || PLACEHOLDER_PROFILE_IMAGE_URL,
              }}
              style={[
                styles.memberImage,
                {
                  zIndex: memberPreviewCount - index,
                  marginLeft: index > 0 ? -10 : 0,
                },
              ]}
            />
          ))}
          {group.members.length > memberPreviewCount && (
            <View style={styles.extraMembersCount}>
              <Text style={styles.extraMembersText}>
                +{group.members.length - memberPreviewCount}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.joinButton} onPress={onJoin}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  groupInfo: {
    marginBottom: 8,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  invitedBy: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  membersCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  memberPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'white',
  },
  extraMembersCount: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
  },
  extraMembersText: {
    fontSize: 12,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  declineButton: {
    backgroundColor: 'white',
    borderColor: '#FF5722',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  declineButtonText: {
    color: '#FF5722',
    fontWeight: 'bold',
  },
});
