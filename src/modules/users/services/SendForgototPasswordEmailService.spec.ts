import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FaKeMailProviders';
import AppError from '@shared/errors/AppError';
import FakesUsersRepository from '../repositories/Fakes/FakesUsersRepository';
import FakeUserTokenRepository from '../repositories/Fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgototPasswordEmailService';
let fakesUserRepository: FakesUsersRepository;
let fakeUsersTokenRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', ()=>{
    beforeEach(()=>{
      const fakesUserRepository = new FakesUsersRepository();
      const fakeMailProvider = new FakeMailProvider();
      const fakeUserTokenRepository = new FakeUserTokenRepository();

      const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
          fakesUserRepository,
          fakeMailProvider,
          fakeUserTokenRepository,
      );
    });
    it('should de  able to recover using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakesUserRepository.create({
        name: 'Jonh Doe',
        email: 'johndoe@exemple.com',
        password: '12345',
    });
     await sendForgotPasswordEmail.execute({
        email: 'johndoe@exemple.com',
      });
   expect(sendMail).toHaveBeenCalled();
    });
 it('should not be able to recover a non-existing user password', async () => {
    await expect (
        sendForgotPasswordEmail.execute({
        email: 'jonhdoe@exemple.com',
    }),
    ).rejects.toBeInstanceOf(AppError);
 });

 it('should generate a forgot password token', async () =>{
     const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');

     const user = await fakesUserRepository.create({
        name:'Jonh Doe',
        email: 'johndoe@exemple.com',
        password: '12345',
    });

     await sendForgotPasswordEmail.execute({
         email: 'johndoe@exemple.com'
     });
     expect(generateToken).toHaveBeenCalledWith(user.id);
 });
});

