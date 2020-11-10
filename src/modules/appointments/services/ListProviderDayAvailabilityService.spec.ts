
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepositrory';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayhAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
    beforeEach(()=>{
         fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayhAvailability = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository);

    });

    it('should be  able list the month availability from provider', async ()=>{
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 10, 7, 17, 0, 0)
        });


            await fakeAppointmentsRepository.create({
                provider_id: 'user',
                user_id: 'user',
                date: new Date(2020, 10, 7, 15, 0, 0)
            });
      jest.spyOn(Date, 'now').mockImplementation(() => {
          const customDate = new Date();
          return new Date(2020, 10, 7, 11).getTime();
      });

      const availability = await listProviderDayhAvailability.execute({
          provider_id: 'user',
          year: 2020,
          month: 11,
          day: 7
      });

      expect(availability).toEqual(expect.arrayContaining([
          {hour: 8, availability: false},
          {hour: 7, availability: false},
          {hour: 9, availability: false},
          {hour: 10, availability: false},
          {hour: 16, availability: false},
          {hour: 15, availability: false},
      ]),
      );
  });
});
