import { getAllUsers } from '../db.service';

export async function sendPushNotificationToAllUsers({
  currentUserUid,
  title,
  body,
  data = {},
}: {
  currentUserUid: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}) {
  const users = await getAllUsers();
  const pushTokens = users
    .filter((user) => user.uid !== currentUserUid)
    .map((user) => user.expoPushToken)
    .filter(Boolean) as string[];

  await sendPushNotification({ expoPushToken: pushTokens, title, body, data });
}

export async function sendPushNotification({
  expoPushToken,
  title,
  body,
  data = {},
}: {
  expoPushToken: string | string[];
  title: string;
  body: string;
  data?: Record<string, string>;
}) {
  const message = { title, body, data, to: expoPushToken, sound: 'default' };

  console.log('sending push notification', message);

  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error('error sending push notification ', error);
  }
}
