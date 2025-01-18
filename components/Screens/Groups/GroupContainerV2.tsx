import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Search, Users, Plus } from 'lucide-react-native';

interface Group {
  name: string;
  members: number;
  workoutsToday?: number;
  isPublic?: boolean;
}

export default function GroupsPage() {
  const yourGroups: Group[] = [
    { name: 'Morning Warriors', members: 8, workoutsToday: 124 },
    { name: 'Lunch Break Club', members: 8, workoutsToday: 124 },
  ];

  const publicGroups: Group[] = [
    { name: 'City Runners', members: 45, isPublic: true },
    { name: 'Yoga Enthusiasts', members: 45, isPublic: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Groups</Text>
          <TouchableOpacity style={styles.createButton}>
            <Plus size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Your Groups</Text>
        {yourGroups.map((group, index) => (
          <TouchableOpacity key={index} style={styles.groupCard}>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <View style={styles.groupStats}>
                <Users size={16} color="#666" style={styles.icon} />
                <Text style={styles.statsText}>{group.members} members</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.statsText}>
                  {group.workoutsToday} workouts today
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.inviteButton}>
              <Text style={styles.inviteButtonText}>Invite</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Discover Groups</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search public groups"
            placeholderTextColor="#666"
          />
        </View>

        {publicGroups.map((group, index) => (
          <TouchableOpacity key={index} style={styles.groupCard}>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <View style={styles.groupStats}>
                <Text style={styles.publicTag}>Public</Text>
                <Text style={styles.dot}>•</Text>
                <Users size={16} color="#666" style={styles.icon} />
                <Text style={styles.statsText}>{group.members} members</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  groupStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
  },
  dot: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 6,
  },
  publicTag: {
    fontSize: 14,
    color: '#666',
    marginRight: 6,
  },
  inviteButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  inviteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  joinButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
