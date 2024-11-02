```typescript
import { Timestamp } from 'firebase/firestore';

// Base Types
export type UserId = string;
export type GroupId = string;

// Enum for exercise types
export enum ExerciseType {
  PUSH_UPS = 'Push Ups',
  PULL_UPS = 'Pull Ups',
  BURPEES = 'Burpees',
  SQUATS = 'Squats',
  // Add other exercise types
}

// Group member roles
export enum GroupMemberRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member',
}

// Group visibility types
export enum GroupVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

// Group member type
export interface GroupMember {
  userId: UserId;
  role: GroupMemberRole;
  joinedAt: Timestamp;
  displayName: string; // Cached for quick access
  photoUrl: string | null; // Cached for quick access
}

// Group settings
export interface GroupSettings {
  allowMemberInvites: boolean; // Can regular members invite others?
  requireApproval: boolean; // Require admin approval for new members?
  showMemberList: boolean; // Is member list visible to non-members?
  allowComments: boolean;
  notificationsEnabled: boolean;
}

// Main Group interface
export interface Group {
  // Identifiers
  groupId: GroupId;
  createdBy: UserId;

  // Basic Info
  groupName: string;
  description: string;
  imageUrl: string | null;

  // Configuration
  visibility: GroupVisibility;
  settings: GroupSettings;

  // Members
  members: Record<UserId, GroupMember>; // Using record for efficient lookups
  memberCount: number; // Denormalized count for quick access

  // Stats (denormalized for quick access)
  totalWorkouts: number;
  lastActivityAt: Timestamp;

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Extended User interface with group relationships
export interface StrongerTogetherUser {
  // Existing fields
  uid: string;
  displayName: string;
  email: string;
  photoUrl: string | null;
  provider: 'email' | 'google';
  expoPushToken: string | null;

  // Group relationships
  groups: {
    [groupId: GroupId]: {
      role: GroupMemberRole;
      joinedAt: Timestamp;
    };
  };

  // Privacy settings
  privacySettings: {
    workoutsVisibility: 'public' | 'groups' | 'private';
    showInPublicFeed: boolean;
    allowGroupInvites: boolean;
  };

  // Stats
  stats: {
    totalWorkouts: number;
    lastWorkoutAt: Timestamp | null;
    streakDays: number;
    currentStreak: number;
  };

  // Workout data
  workouts: UserWorkout[];
}

// Refined UserWorkout interface
export interface UserWorkout {
  id: string; // Unique identifier for the workout
  timestamp: Timestamp;
  exercises: UserWorkoutExercise[];
  notes?: string;
  likedBy: Record<UserId, Timestamp>; // Using record for efficient lookups
  sharedToGroups: GroupId[]; // Which groups this workout was shared to

  // Optional metadata
  location?: {
    latitude: number;
    longitude: number;
    name?: string;
  };
}

export interface UserWorkoutExercise {
  exerciseName: ExerciseType;
  count: number;
  notes?: string;

  // Optional fields for future expansion
  duration?: number; // in seconds
  weight?: number; // in kg/lbs
  sets?: number;
}

// Invitation type for group invites
export interface GroupInvitation {
  inviteId: string;
  groupId: GroupId;
  invitedBy: UserId;
  invitedUserEmail: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Timestamp;
  expiresAt: Timestamp;
}
```
