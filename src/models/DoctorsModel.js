const connection = require('../database/connection');

module.exports = {

    async index() {
        const doctors = await connection('doctors').select('*');
        return doctors;
    },

    async show(id) {

        const doctor = await connection('doctors')
            .select('*')
            .where('id', id)
            .first();

        return doctor;

    },

    async store(data) {

        const { first_name, last_name, crm, hash } = data;

        await connection('doctors').insert({
            first_name,
            last_name,
            crm,
            password: hash,
        });

        return true;
    },

    async update(data) {
        const { id, first_name, last_name, crm, hash } = data;

        const response = await connection('doctors')
            .where('id', id)
            .update({
                first_name,
                last_name,
                crm,
                password: hash
            });

        return response;

    },

    async listSchedule(id) {
        const response = await connection('schedules')
            .join('users', 'users.id', '=', 'schedules.user_id')
            .join('doctors', 'doctors.id', '=', 'schedules.doctor_id')
            .select([
                'users.first_name as patient',
                'doctors.first_name as doctor',
                'hour',
                'date'
            ])
            .where('doctor_id',id);

        return response;
    }

}