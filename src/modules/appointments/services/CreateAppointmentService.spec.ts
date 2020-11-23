import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakesAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepositrory';
import CreateAppointmentService from './CreateAppointmentService';


let fakeNotificationsRepository: FakeNotificationRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentRepository: FakesAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', ()=>{
    beforeEach(()=>{
       fakeAppointmentRepository = new FakesAppointmentsRepository();
       fakeNotificationsRepository = new FakeNotificationRepository();
       createAppointment = new CreateAppointmentService(
       fakeAppointmentRepository,
       fakeNotificationsRepository,
       fakeCacheProvider
       );
    });

    it('should de  able to create a new appointment', async ()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            return new Date(2020, 10, 10, 12).getTime();
        });
    const appointment = await createAppointment.execute({
          date: new Date(),
          provider_id: 'rovider_id',
          user_id: 'user_id',
      });
      expect(appointment).toHaveProperty('id');
      expect(appointment.provider_id).toBe('123123');
    });

    it('should de  able to create two appointments on same time', async ()=>{
      const appointmentDate = new Date(2020,9,24);

      await createAppointment.execute({
          date: appointmentDate,
          provider_id: 'rovider_id',
          user_id: 'user_id',
      });

          await expect(createAppointment.execute({
        date:appointmentDate,
        provider_id: 'rovider_id',
          user_id: 'user_id',
            })).rejects.toBeInstanceOf(AppError);

});
 it('should not be able to create an appointments on a past date', async()=>{
     jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
         return new Date(2020, 10, 12).getTime();
     });
   await expect(createAppointment.execute({
        date: new Date(2020, 10, 11),
        provider_id: 'rovider_id',
        user_id: 'user_id',
            })).rejects.toBeInstanceOf(AppError);

 });
 it('should not be able to create an appointments befores 8am and after 5pm', async()=>{
    jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
        return new Date(2020, 10, 12).getTime();
    });
  await expect(createAppointment.execute({
       date: new Date(2020, 10, 7),
       provider_id: 'rovider_id',
       user_id: 'user_id',
           })).rejects.toBeInstanceOf(AppError);


  await expect(createAppointment.execute({
       date: new Date(2020, 10, 18),
       provider_id: 'rovider_id',
       user_id: 'user_id',
           })).rejects.toBeInstanceOf(AppError);

});
});
