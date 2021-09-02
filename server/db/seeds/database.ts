import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	const initProducts = [
		{
			title: 'Manzana',
			price: 120,
			thumbnail:
				'https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_maca-256.png',
		},
	];
	return knex('products')
		.del()
		.then(() => knex('products').insert(initProducts));
}
