import FakesUsersRepository from '../repositories/Fakes/FakesUsersRepository'
import FakeUserTokenRepository from '../repositories/Fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';
import AppError from '@shared/errors/AppError';

let fakesUsersRepository: FakesUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;


describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakesUsersRepository = new FakesUsersRepository();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();

       resetPassword = new ResetPasswordService(
          fakesUsersRepository,
          fakeUserTokenRepository,
          fakeHashProvider,

      );
    });
    it('should de  able to reset the password', async () => {
    const user = await fakesUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@exemple.com',
        password: '123456',
    });

   const { token } = await fakeUserTokenRepository.generate(user.id);
  const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')
   await resetPassword.execute({
       password: '123123',
       token,


   });
   const updateUser = await fakesUsersRepository.findById(user.id);
   expect(generateHash).toHaveBeenCalledWith('123123')
   expect(updateUser?.password).toBe('123123');
    });

    it('should not be aable to reset the password with non-existing token ', async() =>{
        await expect(
            resetPassword.execute({
                token:'non-existing-token',
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be aable to reset the password with non-existing token user', async() =>{
        const { token } = await fakeUserTokenRepository.generate('no-existing-user');

        await expect(
            resetPassword.execute({
                token,
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able reset password if passed more 2 hours', async ()=>{
        const user = await fakesUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456'
        });
        const { token } = await fakeUserTokenRepository.generate(user.id);
        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            const custonDate = new Date();

            return custonDate.setHours(custonDate.getHours() + 3);
        });

        await expect(
            resetPassword.execute({
                password: '123123',
                token,
            }),
        ).rejects.toBeInstanceOf(AppError);
    })
 });


