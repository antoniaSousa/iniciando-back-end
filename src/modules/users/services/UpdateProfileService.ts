//import path from 'path';
//import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import {inject, injectable} from 'tsyringe';

interface IRequest{
   user_id: string;
   name: string;
   email: string;
   old_password?: string;
   password?: string;
}
class  UpdateProfile {
 constructor(
     @inject('UsersRepository')
     private usersRepository: IUsersRepository,

     @inject('IHashProvider')
     private hashProvider: IHashProvider,
 ){}
public async execute ({
    user_id,
    name,
    email,
    password,
    old_password,
}: IRequest): Promise<User>{
    const user = await this.usersRepository.findById(user_id);
   if(!user){
       throw new AppError ('User not found');
   }
   const userWithUpdateEmail = await this.usersRepository.findByEmail(email);
   if (userWithUpdateEmail && userWithUpdateEmail.id != user_id){
       throw new AppError('E-mail already in use');
   }
  user.name = name;
  user.email = email;
  if (password && !old_password){
      throw new AppError(
      'You need to enter your old password to update your password',);
      }

  if(password && old_password){
     const checkOldPassword =  await this.hashProvider.compareHash(
          password,
          user.password,
          );
          if (!checkOldPassword){
              throw new AppError('old password does not match')
          }
  }

  return this.usersRepository.save(user);
}

}
export default UpdateProfile

