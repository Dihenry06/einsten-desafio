const SecretariatsModel = require('../models/SecretariatsModel');
const AvailabilityScheduleModel = require('../models/AvailabilitySchedulesModel');

module.exports = {

    async alterSchedule(req, res) {
        const accontType = req.headers.authorization;

        if (accontType !== 'secretary') {
            return res.status(400).json({ error: 'permission denied' })
        }
        const { id, doctor_id, hour, date } = req.body;

        if (hour < '08:00:00' || hour > '17:00:00') {
            return res.status(400).json({ error: 'hour indisponible' });
        }

        const availability = await AvailabilityScheduleModel.index(doctor_id, hour, date);

        if (availability) {
            return res.json({ error: 'unavailable time and date' })
        }

        const data = { id, doctor_id, hour, date }

        const response = await SecretariatsModel.alterSchedule(data);

        if (!response) {
            return res.status(400).json({ error: 'error updating schedule' });
        }

        return res.status(200).json({ success: 'updating schedule' });
    },

    async deleteSchedule(req, res) {
        const accontType = req.headers.authorization;

        if (accontType !== 'secretary') {
            return res.status(400).json({ error: 'permission denied' })
        }

        const { id } = req.body;

        const response = await SecretariatsModel.deleteSchedule(id);

        if (!response) {
            return res.status(400).json({ error: 'error deleted schedule' });
        }

        return res.status(200).json({ success: 'deleted schedule' });

    }

    

}