import { Request, Response } from 'express';
import { products } from '../models/productclass';

const tableName = 'productos';

class ProductController {
	async getProducts(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (id) {
				const singleProduct = await products.get(tableName, id);
				if (singleProduct.length === 0) {
					return res
						.status(404)
						.json({ error: 'No existe un producto con este id' });
				}
				return res.json({ product: singleProduct });
			} else {
				const get = await products.get(tableName);
				if (get.length === 0) {
					return res.status(404).json({ error: 'No hay productos cargados' });
				}
				return res.json({ products: get });
			}
		} catch (error) {
			console.error(error);
		}
	}

	async addProduct(req: Request, res: Response) {
		try {
			const { title, price, thumbnail } = req.body;
			if (!title || !price || !thumbnail)
				return res.status(400).json({ error: 'Missing body' });

			const id = await products.add(tableName, req.body);
			const newProduct = await products.get(tableName, id.toString());
			return res.json({ newProduct });
		} catch (error) {
			console.log(error);
		}
	}

	async updateProduct(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { title, price, thumbnail } = req.body;
			const item = await products.get(tableName, id);

			if (!title || !price || !thumbnail)
				return res.status(400).json({ error: 'Missing body' });

			if (item.length) {
				await products.update(tableName, id, req.body);
				const updatedProduct = await products.get(tableName, id);
				return res.json({ updatedProduct });
			} else {
				return res.status(404).json({
					error: 'No existe producto con ese id',
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
	async deleteProduct(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const idExist = await products.get(tableName, id);
			if (idExist.length) {
				await products.delete(tableName, id);
				return res.json({ msg: 'Producto eliminado' });
			} else {
				return res.status(404).json({
					error: 'No existe producto con ese id',
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
}

export const productController = new ProductController();
