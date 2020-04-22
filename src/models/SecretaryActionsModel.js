const connection = require('../database/connection');

module.exports = {

    async listAllSchedules(name) {
        const schedules = await connection('schedules')
            .join('users', 'users.id', '=', 'schedules.user_id')
            .join('users as doctor', 'doctor.id', '=', 'schedules.doctor_id')
            .select([
                'users.first_name as patient',
                'doctor.first_name as doctor',
                'hour',
                'date'
            ])
            .where('doctor.first_name', 'like', `${name}%`);
        return schedules;
    },

    async listSchedulesDateHour(date, hour) {

        const listFilter = await connection('schedules')
            .join('users', 'users.id', '=', 'schedules.user_id')
            .join('users as doctor', 'doctor.id', '=', 'schedules.doctor_id')
            .select([
                'schedules.id',
                'users.first_name as patient',
                'doctor.first_name as doctor',
                'hour',
                'date'
            ])
            .where('date', date)
            .where('hour', hour);

        return listFilter;

    }
}