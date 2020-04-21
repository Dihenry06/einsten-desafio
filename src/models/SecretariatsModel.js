const connection = require('../database/connection');

module.exports = {

    async show() {

    },

    async store(data) {
        const { first_name, last_name, email, hash } = data;

        await connection('secretariats').insert({
            first_name,
            last_name,
            email,
            password: hash,
        });

        return true;
    }

}