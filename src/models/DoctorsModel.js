const connection = require('../database/connection');

module.exports = {

    async index() {
        const doctors = await connection('users').select('*').where('type', 'doctor');
        return doctors;
    },

    async show(id) {

        const doctor = await connection('users')
            .select('*')
            .where('id', id)
            .where('type', 'doctor')
            .first();

        return doctor;

    },

    async listSchedule(id) {
        const response = await connection('schedules')
            .join('users', 'users.id', '=', 'schedules.user_id')
            .join('users as doctor', 'doctor.id', '=', 'schedules.doctor_id')
            .select([
                'users.first_name as patient',
                'doctor.first_name as doctor',
                'hour',
                'date'
            ])
            .where('doctor_id', id);

        return response;
    },

    async deleteSchedule(data){
        const { id, doctor_id } = data;

        const response = await connection('schedules')
            .where('id', id)
            .where('doctor_id', doctor_id)
            .delete();

        return response;
    }

}