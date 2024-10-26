export interface Group {
  description: string;
  groupId: string;
  groupName: string;
  imageUrl: string;
  visibility: 'public' | 'private';
  members: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateGroupFormState {
  groupName: string;
  description: string;
  image: string | null;
  visibility: 'public' | 'private';
}
