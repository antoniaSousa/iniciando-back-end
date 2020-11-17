import {Router} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPassworController from '../controllers/ResetPasswordControllers';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPassworController = new ResetPassworController();

passwordRouter.post('/forgot',
celebrate({
    [ Segments.BODY]: {
        email: Joi.string().email().required(),
    },
}),
forgotPasswordController.create);

passwordRouter.post('/reset',
celebrate({
    [ Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }
}),
resetPassworController.create);


export default passwordRouter;
