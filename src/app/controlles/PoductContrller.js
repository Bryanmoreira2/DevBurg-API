// Importa o Yup para validação de dados
import * as Yup from "yup";
// Importa o modelo Product
import Product from "../models/Product";

class ProductsController {
	// Método para criar um novo produto
	async store(request, response) {
		// Define o esquema de validação para os campos 'name', 'price' e 'category'
		const schema = Yup.object({
			name: Yup.string().required(), // O campo 'name' é obrigatório e deve ser uma string
			price: Yup.number().required(), // O campo 'price' é obrigatório e deve ser um número
			category: Yup.string().required(), // O campo 'category' é obrigatório e deve ser uma string
		});

		try {
			// Valida os dados da requisição com o esquema definido
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			// Retorna erro 400 com os detalhes dos erros de validação
			return response.status(400).json({ errors: err.errors });
		}

		// Extrai o nome do arquivo (path) do objeto 'file' na requisição
		const { filename: path } = request.file;

		// Extrai os campos 'name', 'price' e 'category' do corpo da requisição
		const { name, price, category } = request.body;

		// Cria um novo produto com os dados fornecidos
		const products = await Product.create({
			name,
			price,
			category,
			path,
		});

		// Retorna o produto criado com status 201 (Criado)
		return response.status(201).json({ products });
	}

	// Método para listar todos os produtos
	async index(request, response) {
		// Busca todos os produtos no banco de dados
		const products = await Product.findAll();

		// Exibe o ID do usuário no console (útil para depuração)
		console.log({ userId: request.userId });

		// Retorna a lista de produtos em formato JSON
		return response.json(products);
	}
}

// Exporta uma nova instância de ProductsController
export default new ProductsController();
