const UserModel = require('../models/UserModel');
const passwordCript = require('../utils/passwordCript');

module.exports = {

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
    }

}