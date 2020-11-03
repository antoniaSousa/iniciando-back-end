import {Router} from 'express';

import ProfileControler from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

const profileController = new ProfileControler();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);


export default usersRouter;
