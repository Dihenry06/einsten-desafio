exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();

        table.string('first_name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.string('date_birth', 100).notNullable();
        table.bigInteger('cpf').notNullable().unique();
        table.string('email', 200).notNullable().unique();
        table.string('cep').notNullable();
        table.string('address', 200).notNullable();
        table.integer('number').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('password').notNullable();
        table.string('image');
        table.enu('type',['user','doctor','secretary']).notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
