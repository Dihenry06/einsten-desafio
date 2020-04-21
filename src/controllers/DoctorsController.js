const DoctorsModel = require('../models/DoctorsModel');
const passwordCript = require('../utils/passwordCript');

module.exports = {

    async index(req, res) {
        const doctors = await DoctorsModel.index();
        return res.json(doctors);
    },

    async show(req, res) {
        const { id } = req.params;

        const doctor = await DoctorsModel.show(id);

        if (!doctor) {
            return res.status(400).json({ error: 'doctor not found' });
        }

        return res.status(200).json(doctor)
    },

    async store(req, res) {

        const { first_name, last_name, crm, password } = req.body;

        const hash = await passwordCript.passwordCript(password);

        const data = { first_name, last_name, crm, hash }

        const response = await DoctorsModel.store(data);

        if (!response) {
            return res.status(400).json({ error: 'error inserting' });
        }

        return res.status(200).json({ success: 'registered doctor' });
    },

    async update(req, res) {
        const id = req.headers.authorization;
        const { first_name, last_name, crm, password } = req.body;

        const hash = await passwordCript.passwordCript(password);

        const data = { id, first_name, last_name, crm, hash }

        const response = await DoctorsModel.update(data);

        if (!response) {
            return res.status(400).json({ error: 'error updating' });
        }

        return res.status(200).json({ success: 'updating doctor' });

    },

    async listSchedule(req, res) {
        const id = req.headers.authorization;
        const response = await DoctorsModel.listSchedule(id);

        if (!response) {
            return res.status(400).json({ error: 'error listing schedule' });
        }
        return res.status(200).json(response);
    }

}