import FakesUsersRepository from '../repositories/Fakes/FakesUsersRepository';

import FakeHasProvider from '../provider/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', ()=>{
    it('should be able to authencate', async ()=>{
      const fakesUserRepository = new FakesUsersRepository();
      const fakeHasProvider = new FakeHasProvider();

      const createUser = new CreateUserService(
          fakesUserRepository,
          fakeHasProvider,
      )
      const authenticateUser = new AuthenticateUserService(fakesUserRepository, fakeHasProvider);
     const user = await createUser.execute({
       name: 'John Doe',
       email: 'john@exemplo.com',
       password: '12345'
      });


    const response = await authenticateUser.execute({
        email: 'john@exemplo.com',
        password: '12345',
      });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);

    });

    it('should no be able to authencate with non existing user', async ()=>{
        const fakesUserRepository = new FakesUsersRepository();
        const fakeHasProvider = new FakeHasProvider();

        const authenticateUser = new AuthenticateUserService(fakesUserRepository, fakeHasProvider);

      expect(authenticateUser.execute({
        email: 'john@exemplo.com',
        password: '12345',})).rejects.toBeInstanceOf(AppError)
      });

      it('should not be able to authencate with wrong password', async ()=>{
        const fakesUserRepository = new FakesUsersRepository();
        const fakeHasProvider = new FakeHasProvider();

        const createUser = new CreateUserService(
            fakesUserRepository,
            fakeHasProvider,
        )
        const authenticateUser = new AuthenticateUserService(fakesUserRepository, fakeHasProvider);
       const user = await createUser.execute({
         name: 'John Doe',
         email: 'john@exemplo.com',
         password: '12345'
        });

        expect(authenticateUser.execute({
            email: 'john@exemplo.com',
            password: 'wrong-password',
          })).rejects.toBeInstanceOf(AppError);
        });

    });
