
exports.up = function (knex) {
    return knex.schema.createTable('doctors', (table) => {
        table.increments();

        table.string('first_name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.bigInteger('crm').notNullable().unique();
        table.string('password').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('doctors');
};
