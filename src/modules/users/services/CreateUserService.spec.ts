import AppError from '@shared/errors/AppError';
import FakesUsersRepository from '../repositories/Fakes/FakesUsersRepository';
import FakeHasProvider from '../provider/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

describe('CreateUser', ()=>{
    it('should de  able to create a new user', async ()=>{
      const fakesUserRepository = new FakesUsersRepository();
      const fakeHashProvider = new FakeHasProvider();

      const createUser = new CreateUserService(
          fakesUserRepository, fakeHashProvider,
      );

    const user = await createUser.execute({
        name: 'John Doe',
        email: 'john@exemplo.com',
        password: '12345'
      });
   expect(user).toHaveProperty('id');
    });


    it('should not be  able to create a new user with same email from another', async ()=>{
        const fakesUserRepository = new FakesUsersRepository();
        const fakeHashProvider = new FakeHasProvider();
        const createUser = new CreateUserService(
            fakesUserRepository, fakeHashProvider
        );

      const user = await createUser.execute({
          name: 'John Doe',
          email: 'john@exemplo.com',
          password: '12345'
        });
      await expect (
         createUser.execute({ name: 'John Doe',
        email: 'john@exemplo.com',
        password: '12345'
      }),
       ).rejects.toBeInstanceOf(AppError);
      });
});
