import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('productos', (productsTable) => {
			productsTable.increments();
			productsTable.string('title').notNullable();
			productsTable.decimal('price', 5, 2);
			productsTable.string('thumbnail').notNullable();
			productsTable.timestamp('timestamp').defaultTo(knex.fn.now());
		})
		.createTable('mensajes', (messagesTable) => {
			messagesTable.increments();
			messagesTable.string('email').notNullable();
			messagesTable.string('message').notNullable();
			messagesTable.string('date').notNullable();
			messagesTable.string('time').notNullable();
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('productos').dropTable('mensajes');
}
