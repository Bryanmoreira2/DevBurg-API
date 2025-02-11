import { v4 as uuidv4 } from "uuid"; // Importa a função v4 de uuid com o nome uuidv4
import * as Yup from "yup"; // Importa tudo de Yup

import User from "../models/User"; // Importa o modelo User

class UserController {
	async store(request, response) {
		// Define o esquema de validação com Yup
		const schema = Yup.object().shape({
			name: Yup.string().required(), // Campo 'name' é obrigatório
			email: Yup.string().email().required(), // Campo 'email' é obrigatório e deve ser um email válido
			password: Yup.string().min(6).required(), // Campo 'password_hash' é obrigatório e deve ter pelo menos 6 caracteres
			admin: Yup.boolean(), // Campo 'admin' é opcional e deve ser booleano
		});

		try {
			schema.validateSync(request.body, { abortEarly: false }); // Valida os dados da requisição
		} catch (err) {
			return response.status(400).json({ errors: err.errors }); // Retorna erro de validação se houver
		}

		const { name, email, password, admin } = request.body; // Extrai dados da requisição

		// Verifica se o usuário já existe
		const userExists = await User.findOne({
			where: { email },
		});

		if (userExists) {
			return response.status(409).json({ error: "User already exists" }); // Retorna erro se o usuário já existir
		}

		// Cria um novo usuário no banco de dados
		const user = await User.create({
			id: uuidv4(), // Gera um ID único usando uuidv4
			name,
			email,
			password,
			admin,
		});

		return response.status(201).json({
			// Retorna sucesso com os dados do usuário criado
			id: user.id,
			name,
			email,
			admin,
		});
	}
}

export default new UserController(); // Exporta uma instância de UserController
