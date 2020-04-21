const SecrataryActionsModel = require('../models/SecretaryActionsModel');

module.exports = {

    async listSchedulesDateHour(req,res){
        const { date , hour } =  req.params;

        const response = await SecrataryActionsModel.listSchedulesDateHour(date,hour);

        if(!response){
            return res.status(400).json();
        }
        return res.status(200).json(response);
    }
}