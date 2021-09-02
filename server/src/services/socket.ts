import * as http from 'http';
import { Server } from 'socket.io';
import { products } from '../models/productclass';
import { messages } from '../models/messageclass';

const productTableName = 'productos';
const messageTableName = 'mensajes';

// Socket Server
export const ioServer = (server: http.Server) => {
	const io = new Server(server);
	io.on('connection', async (socket) => {
		console.log('Client Connected');

		try {
			socket.on('addProduct', async (product) => {
				try {
					await products.add(productTableName, product);
				} catch (error) {
					console.log(error);
				}
				io.emit('products', await products.get(productTableName));
			});

			socket.emit('products', await products.get(productTableName));

			socket.on('sendMessage', async (message) => {
				try {
					await messages.add(messageTableName, message);
				} catch (error) {
					console.log(error);
				}
				io.emit('messages', await messages.get(messageTableName));
			});

			socket.emit('messages', await messages.get(messageTableName));
		} catch (error) {
			console.log(error);
		}
	});

	return io;
};
