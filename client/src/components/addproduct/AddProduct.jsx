import React, { useState } from 'react';
import { socket } from '../../services/socket/socket';

function AddProduct() {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const [thumbnail, setThumbnail] = useState('');

	const addProduct = (e) => {
		e.preventDefault();
		socket.emit('addProduct', { title, price, thumbnail });
		setTitle('');
		setPrice('');
		setThumbnail('');
	};

	return (
		<form id='form' onSubmit={addProduct}>
			<h2 className='text-center mb-4 text-light'>Ingrese producto</h2>
			<div className='form-floating mb-3'>
				<input
					type='text'
					className='form-control'
					id='title'
					name='title'
					placeholder='title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<label htmlFor='title'>Titulo del producto</label>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='number'
					className='form-control'
					id='price'
					name='price'
					placeholder='price'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required
				/>
				<label htmlFor='price'>Precio</label>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='text'
					className='form-control'
					id='thumbnail'
					name='thumbnail'
					placeholder='thumbnail'
					value={thumbnail}
					onChange={(e) => setThumbnail(e.target.value)}
					required
				/>
				<label htmlFor='thumbnail'>URL de la imagen</label>
			</div>
			<button className='btn btn-success' type='submit' >
				Ingresar producto
			</button>
		</form>
	);
}

export default AddProduct;
