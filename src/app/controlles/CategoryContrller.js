// Importa o Yup para validação de dados
import * as Yup from "yup";

// Importa o modelo Category
import Category from "../models/Category";

class CategoryController {
	// Método para criar uma nova categoria
	async store(request, response) {
		// Define o esquema de validação para o campo 'name'
		const schema = Yup.object({
			name: Yup.string().required(), // O campo 'name' é obrigatório e deve ser uma string
		});

		try {
			// Valida os dados da requisição com o esquema definido
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			// Retorna erro 400 com os detalhes dos erros de validação
			return response.status(400).json({ errors: err.errors });
		}

		// Extrai o campo 'name' do corpo da requisição
		const { name } = request.body;

		const categoryExists = await Category.findOne({
			where: {
				name,
			},
		});

		if (categoryExists)
			return response.status(400).json({ error: "Category already exists" });

		// Cria uma nova categoria com o nome fornecido
		const category = await Category.create({
			name,
		});

		// Retorna a categoria criada com status 201 (Criado)
		return response.status(201).json({ category });
	}

	// Método para listar todas as categorias
	async index(request, response) {
		// Busca todas as categorias no banco de dados
		const categories = await Category.findAll();

		// Exibe o ID do usuário no console (útil para depuração)
		console.log({ userId: request.userId });

		// Retorna a lista de categorias em formato JSON
		return response.json(categories);
	}
}

// Exporta uma nova instância de CategoryController
export default new CategoryController();
