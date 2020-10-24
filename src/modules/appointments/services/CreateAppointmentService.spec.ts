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
          provider_id: '121345',
      });
      expect(appointment).toHaveProperty('id');
      expect(appointment.provider_id).toBe('121345');
    });
})
