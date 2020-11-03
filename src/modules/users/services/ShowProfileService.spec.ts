
import AppError from '@shared/errors/AppError';
import FakesUsersRepository from '../repositories/Fakes/FakesUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakesUserRepository: FakesUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
    beforeEach(()=>{
        fakesUserRepository = new FakesUsersRepository();
        showProfile = new ShowProfileService(fakesUserRepository);
    });

    it('should be  able show the profile', async ()=>{

    const user = await fakesUserRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',

  });
 const profile = await showProfile.execute({
      user_id: user.id,

  });
  expect(profile.name).toBe('John Doe');
  expect(profile.email).toBe('johndoe@example.com');
    });
  it('should not be able show the profile from non-existing user', async ()=>{

 expect(showProfile.execute({
      user_id: 'non-existing-user-id',

  }),
 ).rejects.toBeInstanceOf(AppError);
});

});
