
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import {Request, Response} from 'express';
import { container } from 'tsyringe';
export default class UserAvatarController{
    public async update(request: Request, response: Response): Promise<Response>{
            const upadateUserAvatar = container.resolve (UpdateUserAvatarService);
            const user = await upadateUserAvatar.execute({
                 user_id: request.user.id,
                 avatarFilename: request.file.filename,
             });
             console.log(user);
             delete user.password;
             return response.json(user);

         }

    }
