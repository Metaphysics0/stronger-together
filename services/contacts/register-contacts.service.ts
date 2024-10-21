import * as Contacts from 'expo-contacts';

export async function registerContacts() {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails],
    });

    if (data.length > 0) {
      const contact = data[0];
      console.log('CONTACTS', contact);
    }
  }
}
