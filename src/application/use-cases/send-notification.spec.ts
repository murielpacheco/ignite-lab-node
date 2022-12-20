import { SendNotification } from './send-notification';

describe('Send notification', () => {
  test('it should be able to send a notification', async () => {
    const sendNotification = new SendNotification();
    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'Olá, amigo!',
      recipientId: 'recipientId-example',
    });

    expect(notification).toBeTruthy();
  });
});
