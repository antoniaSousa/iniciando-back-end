import path from 'path';
import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import fs from 'fs';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/StorageProvider';
import {inject, injectable} from 'tsyringe';

interface IRequest{
    user_id: string;
    avatarFilename: string;
}
class  UpdateUserAvatarService {
 constructor(
     @inject('UsersRepository')
     private usersRepository: IUsersRepository,

     @inject('StorageProvider')
     private storageProvider: IStorageProvider,
 ){}
public async execute ({ user_id, avatarFilename}: IRequest): Promise<User>{

const user = await this.usersRepository.findById(user_id);

if (!user){
    throw new AppError('Only authenticated users can change avatar.', 401);
}
if (user.avatar){
  await this.storageProvider.deleteFile(user.avatar)
}
const fileName = await this.storageProvider.saveFile(avatarFilename);
user.avatar = fileName;

await this.usersRepository.save(user);
return user;
}
}
export default UpdateUserAvatarService
;
