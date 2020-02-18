import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
routes.use(authMiddleware);
routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.put('/users', RecipientsController.update);

routes.post('/recipients', RecipientsController.store);

export default routes;
