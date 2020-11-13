import {Router} from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../http/controllers/AppointmentsController';
import {} from '../http/controllers/ProviderAppointmentsController'


const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

appointmentsRouter.get('/me', appointmentsController.create);

export default appointmentsRouter;


