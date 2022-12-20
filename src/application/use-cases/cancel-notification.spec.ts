import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  test('it should be able to cancel a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(
      inMemoryNotificationsRepository,
    );

    const notification = makeNotification();

    await inMemoryNotificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  test('it should not be able to cancel a non existing notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(
      inMemoryNotificationsRepository,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notificationId',
      });
    }).rejects.toThrowError(NotificationNotFound);
  });
});
