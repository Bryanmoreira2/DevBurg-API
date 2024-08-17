import * as Yup from 'yup';
import Product from '../models/Product';
class ProductsController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
			price: Yup.number().required(),
			category: Yup.string().required(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ errors: err.errors });
		}

		const { filename: path } = request.file;

		const { name, price, category } = request.body;

		const products = await Product.create({
			name,
			price,
			category,
			path,
		});

		return response.status(201).json({ products });
	}
	async index(request, response) {
		const products = await Product.findAll();

		return response.json(products);
	}
}
export default new ProductsController();