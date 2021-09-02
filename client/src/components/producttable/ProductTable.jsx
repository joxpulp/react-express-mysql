import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { socket } from '../../services/socket/socket';

function ProductTable() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		socket.on('products', (data) => {
			console.log(data)
			setProducts(data);
		});
		return () => {
			socket.off('products');
		};
	}, [products]);

	return (
		<div className='container'>
			{products.length !== 0 ? (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<h2 className='text-center mb-4 text-light'>Vista de productos</h2>
					<table className='table table-dark'>
						<thead>
							<tr>
								<th scope='col'>Producto</th>
								<th scope='col'>Precio</th>
								<th scope='col'>Foto</th>
							</tr>
						</thead>
						{products.map((product, index) => (
							<motion.tbody
								initial={{ opacity: 0, x: '-100%' }}
								animate={{ opacity: 1, x: 0 }}
								key={index}
							>
								<tr>
									<td>{product.title}</td>
									<td>{product.price}</td>
									<td>
										<img
											style={{ width: '50px', height: 'auto' }}
											src={product.thumbnail}
											alt='products'
										/>
									</td>
								</tr>
							</motion.tbody>
						))}
					</table>
				</motion.div>
			) : (
				<div className='alert alert-info text-center' role='alert'>
					No hay productos disponibles, agrega uno en el formulario de arriba
				</div>
			)}
		</div>
	);
}

export default ProductTable;
