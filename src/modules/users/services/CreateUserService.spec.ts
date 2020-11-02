import AppError from '@shared/errors/AppError';
import FakesUsersRepository from '../repositories/Fakes/FakesUsersRepository';
import FakeHasProvider from '../provider/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakesUserRepository: FakesUsersRepository;
let fakeHashProvider: FakeHasProvider;
let createUser: CreateUserService;

describe('CreateUser', ()=>{
    beforeEach(()=>{
        fakesUserRepository = new FakesUsersRepository();
        fakeHashProvider = new FakeHasProvider();
        createUser = new CreateUserService(fakesUserRepository, fakeHashProvider);
    })
    it('should de  able to create a new user', async ()=>{

    const user = await createUser.execute({
        name: 'John Doe',
        email: 'john@exemplo.com',
        password: '12345'
      });
   expect(user).toHaveProperty('id');
    });

    it('should not be  able to create a new user with same email from another', async ()=>{

      createUser.execute({
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
