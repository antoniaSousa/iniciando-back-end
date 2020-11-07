
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
            date: new Date(2020, 9, 8, 8, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 10, 8, 8, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 10, 8, 10, 0, 0)
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 10, 9, 11, 0,0)
        });

      const availability = await listProviderMonthAvailability.execute({
          provider_id: 'user',
          year: 2020,
          month: 11
      });

      expect(availability).toEqual(expect.arrayContaining([
          {day: 11, availability: true},
          {day: 13, availability: false},
          {day: 14, availability: false},
          {day: 17, availability: true},
      ]))


  });
});
