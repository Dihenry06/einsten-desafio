const connection = require('../database/connection');

module.exports = {

    async index(filter) {

        const users = await connection('users')
        .select('*')
        .where('type', 'user')
        .where('cpf','like',`${filter}%`)
        .orWhere('email' , 'like' ,`${filter}%`);

        return users;
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
            hash,
            type

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
            type
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

    async alterSchedule(data) {
        const { id, doctor_id, hour, date } = data;

        const response = await connection('schedules')
            .where('id', id)
            .where('doctor_id', doctor_id)
            .update({
                hour,
                date
            });

        return response;
    },

    async deleteSchedule(data) {
        const { id, user_id, doctor_id } = data;

        const response = await connection('schedules')
            .where('id', id)
            .where('user_id', user_id)
            .where('doctor_id', doctor_id)
            .delete();

        return response;
    }


}