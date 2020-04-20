const connection = require('../database/connection');

module.exports = {

    async show(email, cpf) {

        const user = await connection('users')
            .select('id', 'email', 'cpf')
            .where('email', email)
            .where('cpf', cpf)
            .first();

        return user;

    },

    async changePassword(id, password) {
        const response = await connection('users')
            .where('id', id)
            .update({
                password: password,
            });

        return response;
    }


}