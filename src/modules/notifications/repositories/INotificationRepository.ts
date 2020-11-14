import ICreateNotificationDTO from '../dtos/ICreateNotificationDTOs';
import Notification from '../infra/schema/Notification';

export default interface INotificationRepository{
    create(data: ICreateNotificationDTO): Promise<Notification>;
}
