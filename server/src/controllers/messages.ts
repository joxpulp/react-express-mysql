import { Request, Response } from 'express';
import { messages } from '../models/messageclass';

const tableName = 'mensajes';

class MessageController {
	async getMessages(req: Request, res: Response) {
		try {
			const getMessages = await messages.get(tableName);
			if (!getMessages.length)
				return res.status(404).json({ error: 'No hay mensajes cargados' });
			return res.json({ messages: getMessages });
		} catch (error) {
			console.log(error);
		}
	}
	async addMessage(req: Request, res: Response) {
		try {
			const { email, message, date, time } = req.body;
			if (!email || !message || !date || !time)
            return res.status(404).json({ error: 'Body invalido' });
            const id = await messages.add(tableName, req.body)
			const newMessage = await messages.get(tableName, id.toString());
			return res.json({ message: newMessage });
		} catch (error) {
			console.log(error);
		}
	}
}

export const messageController = new MessageController();
