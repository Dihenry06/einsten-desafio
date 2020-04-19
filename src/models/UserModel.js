const connection = require('../database/connection');

module.exports = {

    async index() {
        const users = await connection('users').select('*');
        return users;
    },

    async show(id) {

        const user = await connection('users')
            .select('*')
            .where('id', id)
            .first();

        return user;

    },

    async store(data) {

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
            hash

        } = data;

        await connection('users').insert({
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
            password: hash,
        });

        return true;
    },

    async update(data) {
        const {
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

        } = data;

        const response = await connection('users')
            .where('id', id)
            .update({
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
                password: hash
            });

        return response;

    },

}