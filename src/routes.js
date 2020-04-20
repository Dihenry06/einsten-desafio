const routes = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');
const path = require('path');
const multer = require('multer');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const RecoverPassController = require('./controllers/RecoverPassController');
const DoctorsController = require('./controllers/DoctorsController');
const UploadImageController = require('./controllers/uploadImageController');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join( __dirname,'/images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }

});

const upload = multer({ storage });

/**
 * Route session
 */
routes.post('/sessions', SessionController.create);
/**
 * Route upload images
 */
routes.post('/image',upload.single('image'),UploadImageController.storeNameImage);

routes.get('/users/', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.post('/users/recover', RecoverPassController.recoverPassword);


module.exports = routes;