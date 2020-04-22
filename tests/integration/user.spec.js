const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
describe('User', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new user ', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                first_name: "Diogo",
                last_name: "Henrique",
                date_birth: "06/06/2001",
                cpf: 101010101010,
                email: "Diogo@gmail.com",
                cep: "08581015",
                address: "Rua 2",
                number: 25,
                city: "São Paulo",
                state: "São Paulo",
                password: "TestIntegration",
                type: "user"
            });

        console.log(response.body);
        expect(response.body).toHaveProperty('success');
        expect(response.body.success).toBe("registered user");
    });
});