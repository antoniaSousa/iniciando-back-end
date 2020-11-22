import {Router} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';

import ProfileControler from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

const profileController = new ProfileControler();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/',
celebrate({
    [ Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
}),
profileController.update);

export default profileRouter;
