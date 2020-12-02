import {getMongoRepository,  MongoRepository, ObjectID } from 'typeorm';

import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTOS from '@modules/notifications/dtos/ICreateNotificationDTOs';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationRepository{

    private notification: Notification[] =[];

    public async create({
        content,
        recipient_id,
    }: ICreateNotificationDTOS): Promise<Notification> {
   const notification = new Notification();
   Object.assign(this.notification, {id: new ObjectID, content, recipient_id})
   this.notification.push(notification);

    return notification;
}
}
export default NotificationsRepository;
