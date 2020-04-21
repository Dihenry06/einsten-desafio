const routes = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');
const path = require('path');
const multer = require('multer');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const RecoverPassController = require('./controllers/RecoverPassController');
const DoctorsController = require('./controllers/DoctorsController');
const SecretariatsController = require('./controllers/SecretariatsController');
const SchedulesController = require('./controllers/SchedulesController');
const UploadImageController = require('./controllers/uploadImageController');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }

});

const upload = multer({ storage });

/**
 * Route session
 */
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}), SessionController.create);
/**
 * Route upload images
 */
routes.post('/image', upload.single('image'), celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), UploadImageController.storeNameImage);


/**
 * Routes Users
 */
routes.get('/users/', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown()
}), UserController.index);

routes.get('/users/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), UserController.show);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        date_birth: Joi.string().required(),
        cpf: Joi.number().required(),
        email: Joi.string().required().email(),
        cep: Joi.string().required(),
        address: Joi.string().required(),
        number: Joi.number().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        password: Joi.string().required().min(6)
    })
}), UserController.store);

routes.put('/users', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        first_name: Joi.string(),
        last_name: Joi.string(),
        date_birth: Joi.string(),
        cpf: Joi.number(),
        email: Joi.string().email(),
        cep: Joi.string(),
        address: Joi.string(),
        number: Joi.number(),
        city: Joi.string(),
        state: Joi.string(),
        password: Joi.string().min(6)
    })
}), UserController.update);

routes.post('/users/recover', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        cpf: Joi.number().required()
    })
}), RecoverPassController.recoverPassword);

/**
 * Routes Doctors
 */

routes.get('/doctors', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown()
}), DoctorsController.index);

routes.get('/doctors/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), DoctorsController.show);


routes.post('/doctors',celebrate({
    [Segments.BODY]: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        crm: Joi.number().required(),
        password: Joi.string().required().min(6)
    })
}),DoctorsController.store);

routes.put('/doctors',DoctorsController.update);

/**
 * Routes Secretariats
 */
routes.get('/secretariats/:id',SecretariatsController.show);
routes.post('/secretariats',celebrate({
    [Segments.BODY]: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })
}), SecretariatsController.store);
/**
 * Routes Schedules
 */
routes.get('/schedules',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown()
}), SchedulesController.index);

routes.post('/schedules',celebrate({
    [Segments.BODY]: Joi.object().keys({
        user_id: Joi.number().required(),
        doctor_id: Joi.number().required(),
        hour: Joi.string().required(),
        date: Joi.string().required()
    })
}), SchedulesController.store);

routes.put('/schedules', SchedulesController.delete);
routes.delete('/schedules', SchedulesController.delete);


module.exports = routes;