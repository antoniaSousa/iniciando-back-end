
import FakeHasProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakesUsersRepository from '../repositories/Fakes/FakesUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakesUserRepository: FakesUsersRepository;
let fakeHashProvider: FakeHasProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(()=>{
        fakesUserRepository = new FakesUsersRepository();
        fakeHashProvider = new FakeHasProvider();

        updateProfile = new UpdateProfileService(
            fakesUserRepository,
            fakeHashProvider,

        );
    });

    it('should de  able udate the profile', async ()=>{

    const user = await fakesUserRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',

  });
 const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',

  });
  expect(updateUser.name).toBe('John Tre');
  expect(updateUser.email).toBe('johntre@example.com');
  });

  it('should not be able update the profile from non-existing user', async ()=>{
      expect(
          updateProfile.execute({
              user_id: 'non-existing-user-id',
              name: 'Test',
              email: 'test1@example.com',
          }),
      ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able change to another user email', async ()=>{

   await fakesUserRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',

  });
  const user = await fakesUserRepository.create({
    name: 'Test',
    email: 'teste@example.com',
    password: '123456',

  });

 await expect(updateProfile.execute({
     user_id: user.id,
     name: 'John Tre',
     email: 'johndoe@example.com',
 })).rejects.toBeInstanceOf(AppError);
});

it('should not be able to update the password without old password', async ()=>{

    const user = await fakesUserRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',

  });
 //const updateUser = await updateProfile.execute({
  await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      //old_password: '123123',
      password: '123123',

  }),
  ).rejects.toBeInstanceOf(AppError);
 // expect(updateUser.password).toBe('123123');


  });
  it('should not be able to update the password with wrong old password', async ()=>{

    const user = await fakesUserRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',

  });
  await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      old_password: 'wrong-old-password',
      password: '123123',

  }),
  ).rejects.toBeInstanceOf(AppError);

  });
});

