import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('ololo'),
    category: 'outro-asdsa',
    recipientId: 'recipient-2',
    ...override,
  });
}
