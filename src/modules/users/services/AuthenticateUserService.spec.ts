import FakesUsersRepository from '../repositories/Fakes/FakesUsersRepository';

import FakeHasProvider from '../provider/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

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
});
