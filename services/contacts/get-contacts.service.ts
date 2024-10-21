import * as Contacts from 'expo-contacts';

export async function getContacts() {
  const { data } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.Emails],
  });

  console.log('CONTACTS', data);

  return data;
}
