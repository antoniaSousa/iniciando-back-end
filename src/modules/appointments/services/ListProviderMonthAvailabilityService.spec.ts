
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepositrory';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
    beforeEach(()=>{
         fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
            fakeAppointmentsRepository);

    });

    it('should be  able list the month availability from provider', async ()=>{
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 10, 7, 8, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 10, 7, 9, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 10, 7, 10, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 10, 7, 11, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 10, 7, 12, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 10, 7, 13, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 10, 7, 14, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 10, 7, 15, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 10, 7, 16, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 10, 7, 17, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 10, 8, 12, 0, 0)
        });

        await fakeAppointmentsRepository.create({
          provider_id: 'user',
          user_id: 'user',
          date: new Date(2020, 10, 10, 17, 0, 0)
      });
      await fakeAppointmentsRepository.create({
          provider_id: 'user',
          user_id: 'user',
          date: new Date(2020, 10, 11, 17, 0, 0)
      });
      const availability = await listProviderMonthAvailability.execute({
          provider_id: 'user',
          year: 2020,
          month: 11
      });

      expect(availability).toEqual(expect.arrayContaining([
          {day: 8, availability: true},
          {day: 7, availability: false},
          {day: 10, availability: true},
          {day: 11, availability: true},
      ]))


  });
});
