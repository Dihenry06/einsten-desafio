const bcrypt = require('bcrypt');

module.exports = {

    async passwordCript(password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        return hash;
    },

    async comparePassword(password, dbPassword) {
        const response = bcrypt.compareSync(password, dbPassword);
    
        return response;
    }

}