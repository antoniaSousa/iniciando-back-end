import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FaKeMailProviders';
import FakesUsersRepository from '../repositories/Fakes/FakesUsersRepository';
import SendForgotPasswordEmailService from './SendForgototPasswordEmailService';

describe('SendForgotPasswordEmail', ()=>{
    it('should de  able to recover using the email', async ()=>{
      const fakesUserRepository = new FakesUsersRepository();
      const fakeMailProvider = new FakeMailProvider();

      const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

      const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
          fakesUserRepository,
          fakeMailProvider,

      );
    await fakesUserRepository.create({
        name:'Jonh Doe',
        email: 'johndoe@exemplo.com',
        password: '12345',
    });

     await sendForgotPasswordEmail.execute({
        email: 'johndoe@exemplo.com',

      });
   expect(sendMail).toHaveProperty('id');
    });

});
