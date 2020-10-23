import {Router} from 'express';
import { parseISO} from 'date-fns';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../http/controllers/AppointmentsController';


const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;


