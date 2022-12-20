import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Unread notification', () => {
  test('it should be able to set as unread a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(
      inMemoryNotificationsRepository,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await inMemoryNotificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toBeNull;
  });

  test('it should not be able to set as unread a non existing notificat  ion', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(
      inMemoryNotificationsRepository,
    );

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notificationId',
      });
    }).rejects.toThrowError(NotificationNotFound);
  });
});
