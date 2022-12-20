import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  test('it should be able to count recipients notifications', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      inMemoryNotificationsRepository,
    );

    await inMemoryNotificationsRepository.create(
      new Notification({
        content: new Content('ifsdfs'),
        category: 'teste',
        recipientId: 'recipient-1',
      }),
    );
    await inMemoryNotificationsRepository.create(
      new Notification({
        content: new Content('fsdfdsfds'),
        category: 'outro-teste',
        recipientId: 'recipient-1',
      }),
    );
    await inMemoryNotificationsRepository.create(
      new Notification({
        content: new Content('ololo'),
        category: 'outro-asdsa',
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toBeGreaterThan(1);
  });
});
