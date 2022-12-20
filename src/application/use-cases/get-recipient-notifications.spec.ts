import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get recipients notifications', () => {
  test('it should be able to get recipients notifications', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotification(
      inMemoryNotificationsRepository,
    );

    await inMemoryNotificationsRepository.create(makeNotification());

    await inMemoryNotificationsRepository.create(makeNotification());

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });
    console.log(notifications);
    expect(notifications.length).toBeGreaterThan(1);
  });
});
