const routes = require('express').Router();

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.post('/users/recover', UserController.recoverPassword);


module.exports = routes;