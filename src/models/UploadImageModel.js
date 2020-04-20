const connection = require('../database/connection');

module.exports = {

    async storeImageLocation(path,id) {

        const response = await connection('users')
            .where('id', id)
            .update({
                image : path
            });

        return response;

    }
}