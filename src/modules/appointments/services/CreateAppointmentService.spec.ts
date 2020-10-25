import AppError from '@shared/errors/AppError';
import FakesAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepositrory';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', ()=>{
    it('should de  able to create a new appointment', async ()=>{
      const fakeAppointmentRepository = new FakesAppointmentsRepository();
      const createAppointment = new CreateAppointmentService(
          fakeAppointmentRepository,
      );

    const appointment = await createAppointment.execute({
          date: new Date(),
          provider_id: '12345',
      });
      expect(appointment).toHaveProperty('id');
      expect(appointment.provider_id).toBe('12345');
    });
    it('should de  able to create two appointments on same time', async ()=>{
        const fakeAppointmentRepository = new FakesAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

      const appointmentDate = new Date(2020,9,24);
      await createAppointment.execute({
          date: appointmentDate,
          provider_id:'12345'
      });
          expect(createAppointment.execute
            ({
        date:appointmentDate,
        provider_id: '12345',
            })).rejects.toBeInstanceOf(AppError);

});
});
