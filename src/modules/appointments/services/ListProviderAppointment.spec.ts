
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepositrory';
import ListProviderAppointmentService from './ListProviderAppointmentService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';



let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentService: ListProviderAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointment', () => {
    beforeEach(()=>{
         fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderAppointmentService = new ListProviderAppointmentService(
            fakeAppointmentsRepository,
            fakeCacheProvider);

    });

    it('should be  able list the appointment on specific day', async ()=>{
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 10, 10, 14, 0, 0)

        });
        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 10, 10, 15, 0, 0)
        });

        const appointments = await listProviderAppointmentService.execute({
                provider_id: 'provider',
                year: 2020,
                month: 11,
                day: 10,
            });

      expect(appointments).toEqual([appointment1, appointment2]);
        });

});
