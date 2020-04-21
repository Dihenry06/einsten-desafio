const connection = require('../database/connection');

module.exports = {

    async index() {
        const schedules = await connection('schedules')
            .join('users', 'users.id', '=', 'schedules.user_id')
            .join('doctors', 'doctors.id', '=', 'schedules.doctor_id')
            .select([
                'users.first_name as patient',
                'doctors.first_name as doctor',
                'hour',
                'date'
            ]);
        return schedules;
    },

    async show(id) {

        const schedule = await connection('schedules')
            .join('users', 'users.id', '=', 'schedules.user_id')
            .join('doctors', 'doctors.id', '=', 'schedules.doctor_id')
            .select([
                'users.first_name as patient',
                'doctors.first_name as doctor',
                'hour',
                'date'
            ])
            .where('id', id)
            .first();

        return schedule;

    },

    async store(data) {

        const { user_id, doctor_id, hour, date } = data;

        await connection('schedules').insert({
            user_id,
            doctor_id,
            hour,
            date
        });

        return true;
    },

    async update(id, data) {
        const { hour, date } = data;

        const response = await connection('schedules')
            .where('id', id)
            .update({
                hour,
                date
            });

        return response;

    },

    async delete(id) {

        const response = await connection(schedules)
        .where('id', id).
        delete();

        return response;
    }

}