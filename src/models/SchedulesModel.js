const connection = require('../database/connection');

module.exports = {

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