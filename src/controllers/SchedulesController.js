const SchedulesModel = require('../models/SchedulesModel');
const AvailabilitySchedulesModel = require('../models/AvailabilitySchedulesModel');

module.exports = {


    async show(req, res) {
        const { id } = req.params;

        const schedule = await SchedulesModel.show(id);

        if (!schedule) {
            return res.status(400).json({ error: 'schedule not found' });
        }

        return res.status(200).json(schedule)
    },

    async store(req, res) {

        const { user_id, doctor_id, hour, date } = req.body;

        if (hour < '08:00:00' || hour > '17:00:00') {
            return res.status(400).json({ error: 'hour indisponible' });
        }

        const data = { user_id, doctor_id, hour, date }

        const availability = await AvailabilitySchedulesModel.index(doctor_id, hour, date);

        if (availability) {
            return res.json({ error: 'unavailable time and date' })
        }

        const response = await SchedulesModel.store(data);

        if (!response) {
            return res.status(400).json({ error: 'error inserting' });
        }

        return res.status(200).json({ success: 'registered schedule' });
    },

}