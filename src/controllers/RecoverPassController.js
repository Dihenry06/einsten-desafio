const recoverPassModel = require('../models/RecoverPassModel');
const passwordCript = require('../utils/passwordCript');
const generateUniqueId = require('../utils/generateUniqueId');
const MailController = require('./Mail');

module.exports = {

    async recoverPassword(req, res) {
        const { email, cpf } = req.body;

        const response = await recoverPassModel.show(email, cpf);

        if (!response) {
            return res.json({ error: 'user not found' });
        }
        const newPassword = await generateUniqueId();
        const hash = await passwordCript.passwordCript(newPassword)

        const changePassword = await recoverPassModel.changePassword(response.id, hash);

        if (!changePassword) {
            return res.json({ error: 'register cannot be updated' });
        }

        await MailController.send(email, 'Nova Senha', newPassword);
        return res.status(200).json({ success: 'password changed' });
    },

}