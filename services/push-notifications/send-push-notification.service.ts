export async function sendPushNotification({
  expoPushToken,
  title,
  body,
  data = {},
}: {
  expoPushToken: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: data,
  };

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
