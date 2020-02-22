import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/users', UserController.store);

routes.post('/recipients', RecipientsController.store);
routes.get('/recipients', RecipientsController.index);
routes.put('/recipients/:id', RecipientsController.update);
routes.delete('/recipients/:id', RecipientsController.delete);

export default routes;
