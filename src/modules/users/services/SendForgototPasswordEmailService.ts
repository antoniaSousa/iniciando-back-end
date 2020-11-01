import {inject, injectable} from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProviders';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokenRepository';



interface IRequest{
    email: string;

}

class SendForgototPasswordEmailService{
     constructor(
         @inject('UsersRepository')
         private usersRepository: IUsersRepository,

         @inject('MailProvider')
         private mailProvider: IMailProvider,


         @inject('UserTokensRepository')

         private userTokensRepository: IUserTokensRepository,

         ){}

    public async execute({email}: IRequest): Promise<void>{
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('User does not exists');
        }
       await this.userTokensRepository.generate(

            user.id);
             await this.mailProvider.sendMail(
                 email,
            'Pedido de recuperação de senha recebido');
    }
}

export default SendForgototPasswordEmailService;
