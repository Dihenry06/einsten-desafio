const connection = require('../database/connection');

module.exports = {

    async listSchedulesDateHour(date, hour) {

        const listFilter = await connection('schedules')
            .join('users', 'users.id', '=', 'schedules.user_id')
            .join('doctors', 'doctors.id', '=', 'schedules.doctor_id')
            .select([
                'schedules.id',
                'users.first_name as patient',
                'doctors.first_name as doctor',
                'hour',
                'date'
            ])
            .where('date', date)
            .where('hour', hour);

        return listFilter;

    }
}