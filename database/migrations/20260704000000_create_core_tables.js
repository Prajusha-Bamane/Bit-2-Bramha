export function up(knex) {
  return knex.schema
    .createTable('employees', (table) => {
      table.string('id', 36).primary();
      table.string('first_name', 100).notNullable();
      table.string('last_name', 100).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.enum('role', ['Admin', 'Manager', 'Employee']).defaultTo('Employee').notNullable();
      table.string('department', 100).nullable();
      table.enum('status', ['Active', 'Inactive', 'Suspended']).defaultTo('Active').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    })
    .createTable('refresh_tokens', (table) => {
      table.string('id', 36).primary();
      table.string('token', 512).notNullable().unique();
      table.string('employee_id', 36).notNullable()
        .references('id').inTable('employees')
        .onDelete('CASCADE');
      table.timestamp('expires_at').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists('refresh_tokens')
    .dropTableIfExists('employees');
}
