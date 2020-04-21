const connection = require('../database/connection');

module.exports = {
    async index(doctor_id, hour, date) {
        const schedule = await connection('schedules')
            .select('id')
            .where('doctor_id', doctor_id)
            .where('hour', hour)
            .where('date', date)
            .first();

        return schedule;
    }
}