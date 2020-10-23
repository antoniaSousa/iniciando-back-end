import {Router} from 'express';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';
const usersRouter = Router();

const usersController = new UsersController();

const userAvatarController =  new UserAvatarController();
const upload = multer(uploadConfig.multer);
usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', userAvatarController.update);

export default usersRouter;
