import knex, { Knex } from 'knex';
import dbConfig from '../knexfile';
import { Products } from './interfaces';

class Product {
	connection: Knex;

	constructor() {
		const environment = 'development';
		const options = dbConfig[environment];
		this.connection = knex(options);
	}

	get(tableName: string, id?: string) {
		if (id) return this.connection(tableName).where('id', id);
		return this.connection(tableName);
	}

	add(tableName: string, body: Products) {
		return this.connection(tableName).insert(body);
	}

	update(tableName: string, id: string, body: Products) {
		return this.connection(tableName).where('id', id).update(body);
	}

	delete(tableName: string, id: string) {
		return this.connection(tableName).where('id', id).del();
	}
}

export const products = new Product();
