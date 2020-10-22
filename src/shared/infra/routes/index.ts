import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users_route';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter)

export default routes;