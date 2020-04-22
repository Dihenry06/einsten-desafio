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
const SecretaryActionsController = require('./controllers/SecretaryActionsController');


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

//pronto
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}), SessionController.create);
/**
 * Route upload images
 */

//pronto
routes.post('/image', upload.single('image'), celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), UploadImageController.storeNameImage);

/**
 * Routes Users
 */

//pronto
routes.get('/users', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), UserController.index);

//pronto
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
        password: Joi.string().required().min(6),
        type: Joi.string().required()
    })
}), UserController.store);
//pronto
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

//pronto
routes.post('/users/recover', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        cpf: Joi.number().required()
    })
}), RecoverPassController.recoverPassword);
//pronto
routes.put('/users/schedule', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        doctor_id: Joi.number().required(),
        hour: Joi.string().required(),
        date: Joi.string().required()
    })
}), UserController.alterSchedule);
//pronto
routes.delete('/users/schedule', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        user_id: Joi.number().required(),
        doctor_id: Joi.number().required(),
    })
}), UserController.deleteSchedule);

/**
 * Routes Doctors
 */
//pronto
routes.get('/doctor-schedule', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown()
}), DoctorsController.listSchedule);
//pronto
routes.delete('/doctor-schedule', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown(),
    [Segments.BODY] : Joi.object().keys({
        doctor_id : Joi.number().required()
    })
}), DoctorsController.deleteSchedule);

/**
 * Routes Schedules
 */
//pronto
routes.get('/schedules', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), SchedulesController.index);

routes.get('/schedules/:date/:hour', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        date: Joi.string().required(),
        hour: Joi.string().required(),
    })
}), SecretaryActionsController.listSchedulesDateHour);

routes.post('/schedules', celebrate({
    [Segments.BODY]: Joi.object().keys({
        user_id: Joi.number().required(),
        doctor_id: Joi.number().required(),
        hour: Joi.string().required(),
        date: Joi.string().required()
    })
}), SchedulesController.store);

routes.put('/schedules', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        doctor_id: Joi.number().required(),
        hour: Joi.string().required(),
        date: Joi.string().required()
    })
}), SchedulesController.update);

routes.delete('/schedules', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        user_id: Joi.number().required(),
    })
}), SchedulesController.delete);


module.exports = routes;