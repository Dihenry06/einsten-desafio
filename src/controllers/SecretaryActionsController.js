const SecrataryActionsModel = require('../models/SecretaryActionsModel');

module.exports = {

    async listAllSchedules(req, res) {
        const accontType = req.headers.authorization;

        if (accontType !== 'secretary') {
            return res.status(400).json({ error: 'permission denied' });
        }

        const {name} = req.params;

        const Schedules = await SecrataryActionsModel.listAllSchedules(name);
        return res.status(200).json(Schedules);
    },
    async listSchedulesDateHour(req, res) {
        const { date, hour } = req.params;

        const response = await SecrataryActionsModel.listSchedulesDateHour(date, hour);

        if (!response) {
            return res.status(400).json();
        }
        return res.status(200).json(response);
    }
}