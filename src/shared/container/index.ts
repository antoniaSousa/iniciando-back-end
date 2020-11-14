
import {container} from 'tsyringe';
import '@modules/user/providers';
import './providers';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import INotifications from '@modules/notifications/repositories/INotificationRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';


container.registerSingleton<IAppointmentsRepository>(
'AppointmentsRepository',
AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
'UsersRepository',
UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
'UsersTokensRepository',
UsersTokensRepository,
);

container.registerSingleton<NotificationsRepository >(
    'NotificationsRepository ',
    NotificationsRepository ,
    );



