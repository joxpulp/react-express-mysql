// Update with your config settings.

export default {
	development: {
		client: 'mysql',
		connection: {
			host: '192.168.64.2',
			user: 'josue',
			password: 'josue',
			database: 'e-commerce',
		},
		migrations: { directory: __dirname + '/db/migrations' },
		seeds: { directory: __dirname + '/db/seeds' },
	},
	development2: {
		client: 'sqlite3',
		connection: { filename: './messages' },
		useNullAsDefault: true,
		migrations: { directory: __dirname + '/db/migrations' },
		seeds: { directory: __dirname + '/db/seeds' },
	},
};
