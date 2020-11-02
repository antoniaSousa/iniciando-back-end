import FakesUsersRepository from '../repositories/Fakes/FakesUsersRepository';

import FakeHasProvider from '../provider/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

 let fakesUserRepository: FakesUsersRepository;
 let createUser: CreateUserService;
 let fakeHasProvider: FakeHasProvider;
 let authenticateUser: AuthenticateUserService;
describe('AuthenticateUser', ()=>{
    beforeEach(()=>{
        fakesUserRepository = new FakesUsersRepository();
        fakeHasProvider = new FakeHasProvider();

        createUser = new CreateUserService(
        fakesUserRepository,
        fakeHasProvider,
        );

        authenticateUser = new AuthenticateUserService(
            fakesUserRepository,
            fakeHasProvider,
        );
        });
    it('should be able to authencate', async ()=>{

      const user = await fakesUserRepository.create({
       name: 'John Doe',
       email: 'john@exemplo.com',
       password: '12345'
      });

    const response = await authenticateUser.execute({
        email: 'john@exemplo.com',
        password: '12345',
      });
    await expect(response).toHaveProperty('token');
    await expect(response.user).toEqual(user);

    });

    it('should no be able to authencate with non existing user', async ()=>{
      await expect(authenticateUser.execute({
        email: 'john@exemplo.com',
        password: '12345',})).rejects.toBeInstanceOf(AppError)
      });

      it('should not be able to authencate with wrong password', async ()=>{

        await createUser.execute({
         name: 'John Doe',
         email: 'john@exemplo.com',
         password: '12345'
        });

       await expect(authenticateUser.execute({
            email: 'john@exemplo.com',
            password: 'wrong-password',
          })).rejects.toBeInstanceOf(AppError);
        });
    });
