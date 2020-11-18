import {Router} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../http/controllers/AppointmentsController';
import {} from '../http/controllers/ProviderAppointmentsController'


const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', celebrate({
    [ Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date()
    },
}),

appointmentsController.create,
);

appointmentsRouter.get('/me', appointmentsController.create);

export default appointmentsRouter;


