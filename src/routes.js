const routes = require('express').Router();

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const RecoverPassword = require('./controllers/RecoverPassController');

routes.post('/sessions', SessionController.create);

routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.post('/users/recover', RecoverPassword.recoverPassword);


module.exports = routes;