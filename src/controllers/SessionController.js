const SessionModel = require('../models/SessionModel');
const passwordCript = require('../utils/passwordCript');

module.exports = {
    async create(req, res) {
        const { email, password } = req.body;

        const user = await SessionModel.create(email);

        if(!user){
            return res.status(404).json({error: "no user found with this email or password."});
        }
        
        const comparePassword = await passwordCript.comparePassword(password, user.password);

        if( !comparePassword){
            return res.status(404).json({error: "no user found with this email or password."});
        }

        return res.json(user);
    }
}