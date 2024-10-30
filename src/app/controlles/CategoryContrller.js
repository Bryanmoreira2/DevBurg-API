// Importa o Yup para validação de dados
import * as Yup from "yup";
import User from "../models/User";
import Category from "../models/Category"; // Importa o modelo Category

class CategoryController {
	// Cria uma nova categoria
	async store(request, response) {
		// Esquema de validação para o campo 'name'
		const schema = Yup.object({
			name: Yup.string().required(), // 'name' obrigatório
		});

		try {
			// Valida os dados da requisição
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			// Retorna erro 400 com detalhes da validação
			return response.status(400).json({ errors: err.errors });
		}

		// Verifica se o usuário é administrador
		const { admin: isAdmin } = await User.findByPk(request.userId);
		if (!isAdmin) {
			return response.status(401).json();
		}

		// Obtém o caminho do arquivo
		const { filename: path } = request.file;

		// Obtém o campo 'name' da requisição
		const { name } = request.body;

		// Verifica se a categoria já existe
		const categoryExists = await Category.findOne({ where: { name } });
		if (categoryExists) {
			return response.status(400).json({ error: "Category already exists" });
		}

		// Cria a nova categoria
		const { id } = await Category.create({ name, path });

		// Retorna a categoria criada com status 201
		return response.status(201).json({ id, name });
	}

	// Atualiza uma categoria existente
	async update(request, response) {
		// Esquema de validação para o campo 'name'
		const schema = Yup.object({ name: Yup.string() });

		try {
			// Valida os dados da requisição
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			// Retorna erro 400 com detalhes da validação
			return response.status(400).json({ errors: err.errors });
		}

		// Verifica se o usuário é administrador
		const { admin: isAdmin } = await User.findByPk(request.userId);
		if (!isAdmin) {
			return response.status(401).json();
		}

		// Verifica se a categoria existe
		const { id } = request.params;
		const categoryExists = await Category.findByPk(id);
		if (!categoryExists) {
			return response.status(400).json({ message: 'Invalid category ID' });
		}

		// Verifica se o arquivo foi enviado
		let path;
		if (request.file) {
			path = request.file.filename;
		}

		// Obtém o campo 'name' da requisição
		const { name } = request.body;

		// Verifica se o nome da categoria já existe
		if (name) {
			const categoryNameExists = await Category.findOne({
				where: { name },
			});
	
			if (categoryNameExists && categoryNameExists.id != +id) {
				return response.status(400).json({ error: "Category already exists" });
			}
		}

		// Atualiza a categoria
		await Category.update({ name, path }, { where: { id } });

		// Retorna status 200 de sucesso
		return response.status(200).json();
	}

	// Lista todas as categorias
	async index(request, response) {
		// Busca todas as categorias no banco de dados
		const categories = await Category.findAll();

		// Retorna a lista de categorias
		return response.json(categories);
	}
}

// Exporta uma nova instância de CategoryController
export default new CategoryController();

