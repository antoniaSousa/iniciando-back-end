import {inject, injectable} from 'tsyringe';
import path from 'path';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProviders';
import IUserTokensRepository from '../repositories/IUserTokenRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;

}
@injectable()
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

                const { token } = await this.userTokensRepository.generate(user.id);

                const forgotPasswordTemplate =
                path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

             await this.mailProvider.sendMail({
             to: {
             name: user.name,
             email: user.email,
            },
            subject: '[GoBarber] Recuperação de senha',
            templateData: {
            file: forgotPasswordTemplate,
            variables:{
                name: user.name,
                link: `http://localhost:3000/reset_password?token=${token}`
            }
         },
});
 }
}
export default SendForgototPasswordEmailService;