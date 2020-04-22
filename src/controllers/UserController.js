const UserModel = require('../models/UserModel');
const AvailabilityScheduleModel = require('../models/AvailabilitySchedulesModel');
const passwordCript = require('../utils/passwordCript');

module.exports = {

    async index(req, res) {
        const accontType = req.headers.authorization;

        if (accontType !== 'secretary') {
            return res.status(400).json({ error: 'permission denied' })
        }

        const users = await UserModel.index();
        return res.json(users);
    },

    async show(req, res) {
        const { id } = req.params;

        const user = await UserModel.show(id);

        if (!user) {
            return res.status(400).json({ error: 'user not found' });
        }

        return res.status(200).json(user)
    },

    async store(req, res) {

        const {
            first_name,
            last_name,
            date_birth,
            cpf,
            email,
            cep,
            address,
            number,
            city,
            state,
            password,
            type
        } = req.body;

        const hash = await passwordCript.passwordCript(password);

        const data = {

            first_name,
            last_name,
            date_birth,
            cpf,
            email,
            cep,
            address,
            number,
            city,
            state,
            hash,
            type
        }

        const response = await UserModel.store(data);

        if (!response) {
            return res.status(400).json({ error: 'error inserting' });
        }

        return res.status(200).json({ success: 'registered user' });
    },

    async update(req, res) {
        const id = req.headers.authorization;
        const {
            first_name,
            last_name,
            date_birth,
            cpf,
            email,
            cep,
            address,
            number,
            city,
            state,
            password
        } = req.body;

        const hash = await passwordCript.passwordCript(password);

        const data = {
            id,
            first_name,
            last_name,
            date_birth,
            cpf,
            email,
            cep,
            address,
            number,
            city,
            state,
            hash
        }

        const response = await UserModel.update(data);

        if (!response) {
            return res.status(400).json({ error: 'error updating' });
        }

        return res.status(200).json({ success: 'updating user' });

    },

    async alterSchedule(req, res) {
        const id = req.headers.authorization;
        const { doctor_id, hour, date } = req.body;

        if (hour < '08:00:00' || hour > '17:00:00') {
            return res.status(400).json({ error: 'hour indisponible' });
        }

        const availability = await AvailabilityScheduleModel.index(doctor_id, hour, date);

        if (availability) {
            return res.json({ error: 'unavailable time and date' })
        }

        const data = { id, doctor_id, hour, date }

        const response = await UserModel.alterSchedule(data);

        if (!response) return;

        return res.status(200).json({ success: 'updating schedule' });
    },

    async deleteSchedule(req, res) {
        const id = req.headers.authorization;
        const { user_id, doctor_id } = req.body;

        const data = { id, user_id, doctor_id }
        const response = await UserModel.deleteSchedule(data);

        if (!response) return;

        return res.status(200).json({ success: 'deleted schedule' });
    }
}