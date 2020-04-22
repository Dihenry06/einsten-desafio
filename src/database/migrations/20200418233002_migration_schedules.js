
exports.up = function(knex) {
    return knex.schema.createTable('schedules', (table) => {
        table.increments();

        table.integer('user_id').notNullable();
        table.integer('doctor_id').notNullable();
        table.time('hour').notNullable();
        table.date('date').notNullable();

        table.foreign('user_id').references('id').inTable('users');
        table.foreign('doctor_id').references('id').inTable('users');

        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('schedules');
};
