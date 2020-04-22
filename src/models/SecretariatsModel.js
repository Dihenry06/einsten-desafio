const connection = require('../database/connection');

module.exports = {

    async alterSchedule(data) {

        const { id, doctor_id, hour, date } = data;

        const response = await connection('schedules')
            .where('id', id)
            .update({
                doctor_id,
                hour,
                date
            });

        return response;
    },

    async deleteSchedule(id){

        const response = await connection('schedules')
            .where('id', id)
            .delete();

        return response;
    }

}