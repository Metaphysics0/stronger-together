import * as Contacts from 'expo-contacts';
import { create } from 'zustand';

interface ContactsState {
  contacts: Contacts.Contact[];
  setContacts: (contacts: Contacts.Contact[]) => void;
}

export const useContactsStore = create<ContactsState>((set) => ({
  contacts: [],
  setContacts: (contacts: Contacts.Contact[]) => set({ contacts }),
}));
