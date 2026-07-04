import bcrypt from 'bcrypt';

export async function seed(knex) {
  // Clear existing entries due to referential integrity constraints
  await knex('refresh_tokens').del();
  await knex('employees').del();

  const hashedPassword = await bcrypt.hash('password123', 12);

  await knex('employees').insert([
    {
      id: 'a59cf837-73d8-4f24-9b21-4fa3e46c750b',
      first_name: 'System',
      last_name: 'Administrator',
      email: 'admin@hrms.com',
      password: hashedPassword,
      role: 'Admin',
      department: 'Human Resources',
      status: 'Active',
    },
    {
      id: 'b81ef392-12d8-4f92-9b21-4fa3e46c78bc',
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@hrms.com',
      password: hashedPassword,
      role: 'Employee',
      department: 'Engineering',
      status: 'Active',
    },
  ]);
}
