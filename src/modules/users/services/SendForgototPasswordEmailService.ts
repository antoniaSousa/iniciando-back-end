import {inject, injectable} from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProviders';



interface IRequest{
    email: string;

}

class SendForgototPasswordEmailServicervice{
     constructor(
         @inject('UsersRepository')
         private usersRepository: IUsersRepository,

         @inject('MailProvider')
         private mailProvider: IMailProvider,

         ){}
    public async execute({email}: IRequest): Promise<void>{
        this.mailProvider.sendMail(
            email, 'Pedido de recuperação de senha recebido');
    }


}

export default SendForgototPasswordEmailServicervice;
