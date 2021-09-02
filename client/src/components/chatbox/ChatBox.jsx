import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { socket } from '../../services/socket/socket';
import dayjs from 'dayjs';

function ChatBox() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const chatBox = useRef(null)

	const sendMessage = (e) => {
		e.preventDefault();
		socket.emit('sendMessage', {
			email,
			message,
			date: dayjs().format('DD/MM/YYYY'),
			time: dayjs().format('HH:mm:ss'),
		});
		setMessage('');
	};

	useEffect(() => {
		socket.on('messages', (data) => {
			setMessages(data);
			chatBox.current.scrollTop = chatBox.current.scrollHeight;
		});
		return () => {
			socket.off('messages');
		};
	}, [messages]);

	return (
		<div className='container'>
			<h2 className='text-center mb-4 text-light'>Centro de Mensajes</h2>
			<form onSubmit={sendMessage}>
				<div className='container d-flex justify-content-center'>
					<div className='form-floating'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							placeholder='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<label htmlFor='email'>Correo Electronico</label>
					</div>
				</div>
				<hr style={{ backgroundColor: 'white' }} />
				<div
					style={{
						width: '80%',
						height: '400px',
						borderRadius: '5px',
						overflowY: 'scroll',
						overflowX: 'hidden',
					}}
					className='container bg-light p-3'
					ref={chatBox}
				>
					{messages.map((amessage, index) => (
						<motion.div
							initial={{ opacity: 0, x: '-100%' }}
							animate={{ opacity: 1, x: 0 }}
							className='container d-flex flex-column flex-lg-row'
							key={index}
						>
							<p className='me-2 text-primary'>{amessage.email}</p>
							<p className='me-2 text-danger'>
								[{amessage.date} {amessage.time}]:
							</p>

							<p className='me-2 text-success'>{amessage.message}</p>
							<hr style={{ backgroundColor: 'black' }} />
						</motion.div>
					))}
				</div>
				<div
					style={{ width: '80%' }}
					className='form-floating mx-auto my-2 d-flex'
				>
					<input
						type='text'
						className='form-control'
						id='message'
						name='message'
						placeholder='message'
						value={message}
						disabled={!/^[\a-z0-9._-]+@{1}[\\a-z0-9.]+\.[a-z]{2,3}$/.test(email)}
						onChange={(e) => setMessage(e.target.value)}
						onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
						required
					/>
					<label htmlFor='message'>Mensaje</label>
					<button
						className='btn btn-success ms-2'
						disabled={!/^[\a-z0-9._-]+@{1}[\\a-z0-9.]+\.[a-z]{2,3}$/.test(email)}
						type='submit'
					>
						Enviar
					</button>
				</div>
			</form>
		</div>
	);
}

export default ChatBox;
