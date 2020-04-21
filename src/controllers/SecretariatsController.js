const SecretariatsModel = require('../models/SecretariatsModel');
const passwordCript = require('../utils/passwordCript');

module.exports = {

    async show(req, res) {

    },

    async store(req, res) {
        const { first_name, last_name, email, password } = req.body;

        const hash = await passwordCript.passwordCript(password);

        const data = { first_name, last_name, email, hash }

        const response = await SecretariatsModel.store(data);

        if (!response) {
            return res.status(400).json({ error: 'error inserting' });
        }

        return res.status(200).json({ success: 'registered secretary' });
    }
}