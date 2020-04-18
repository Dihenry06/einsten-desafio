const connection = require('../database/connection');

module.exports  = {

    async store(data) {

        const { 
            first_name,
            last_name,
            date_birth,
            cpf,
            email,
            cep,
            address,
            number,
            city,
            state,
            hash
              
        } = data;

        await connection('users').insert({           
            first_name,
            last_name,
            date_birth,
            cpf,
            email,
            cep,
            address,
            number,
            city,
            state,
            "password": hash,
            created_at: new Date()
        });

        return true;
    }
}