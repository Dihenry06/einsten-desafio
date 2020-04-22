const DoctorsModel = require('../models/DoctorsModel');

module.exports = {

    async listSchedule(req, res) {
        const id = req.headers.authorization;
        const response = await DoctorsModel.listSchedule(id);

        if (!response) {
            return res.status(400).json({ error: 'error listing schedule' });
        }
        return res.status(200).json(response);
    },

    async deleteSchedule(req, res) {
        const id = req.headers.authorization;
        const {doctor_id} = req.body;

        const data = {id,doctor_id}

        const response = await DoctorsModel.deleteSchedule(data);

        if (!response) {
            return res.status(400).json({ error: 'error listing schedule' });
        }
        return res.status(200).json({ success: 'deleted schedule' });  
    }

}