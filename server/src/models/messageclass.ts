import knex, { Knex } from 'knex';
import dbConfig from '../knexfile';
import { Messages } from './interfaces';




export default class Message {
	connection: Knex;

	constructor() {
		const environment = 'development2';
		const options = dbConfig[environment];
		this.connection = knex(options);
	}

	get(tableName: string, id?: string) {
		if (id) return this.connection(tableName).where('id', id);
		return this.connection(tableName);
	}

	add(tableName: string, body: Messages) {
		return this.connection(tableName).insert(body);
	}
}

export const messages = new Message();