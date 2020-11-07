
import FakesUsersRepository from '@modules/users/repositories/Fakes/FakesUsersRepository';
import ListProvidersService from './ListProviderService';


let fakesUserRepository: FakesUsersRepository;
let listProvider: ListProvidersService;

describe('ListProvider', () => {
    beforeEach(()=>{
        fakesUserRepository = new FakesUsersRepository();
        listProvider = new ListProvidersService(fakesUserRepository);
    });

    it('should be  able show to list providers', async ()=>{

    const user1  =await fakesUserRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',

  });

  const user2 = await fakesUserRepository.create({
    name: 'John Trê',
    email: 'johndoe@example.com',
    password: '123456',

  });
 const loggedUser = await fakesUserRepository.create({
    name: 'John Qua',
    email: 'johndoe@example.com',
    password: '123456',

  });
  const providers = await listProvider.execute({
  user_id: loggedUser.id,
  });

 expect(providers).toEqual([user1, user2])
});
});

