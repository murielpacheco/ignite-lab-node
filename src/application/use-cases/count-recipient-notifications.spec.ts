import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  test('it should be able to count recipients notifications', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      inMemoryNotificationsRepository,
    );

    await inMemoryNotificationsRepository.create(makeNotification());

    await inMemoryNotificationsRepository.create(makeNotification());

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toBeGreaterThan(1);
  });
});
