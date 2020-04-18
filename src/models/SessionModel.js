const connection = require('../database/connection');

module.exports = {
    async create(email){

        const user = await connection('users')
        .select('email','password')
        .where('email',email)
        .first();

        return user;
    }
}