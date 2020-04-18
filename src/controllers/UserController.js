const UserModel = require('../models/UserModel');
const passwordCript = require('../utils/passwordCript');

module.exports = {

    async index(req, res) {
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
            password
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
            hash
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


}