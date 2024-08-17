import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
	// Método assíncrono para criar uma nova sessão de usuário
	async store(request, response) {
		// Validação dos dados de entrada usando Yup
		const schema = Yup.object({
			email: Yup.string().email().required(), // Email deve ser válido e obrigatório
			password: Yup.string().min(6).required(), // Senha deve ter no mínimo 6 caracteres e ser obrigatória
		});

		// Verifica se os dados enviados no request body são válidos
		const isValid = await schema.isValid(request.body);

		// Função para retornar erro de autenticação
		const emailOrPasswordIncorrect = () => {
			response.status(401).json({ error: 'make sure your email or password is correct' });
		};

		// Retorna erro se a validação falhar
		if (!isValid) {
			return emailOrPasswordIncorrect();
		}

		const { email, password } = request.body;

		// Busca o usuário no banco de dados pelo email
		const user = await User.findOne({
			where: { email },
		});

		// Retorna erro se o usuário não for encontrado
		if (!user) {
			return emailOrPasswordIncorrect();
		}

		// Verifica se a senha fornecida é igual à senha do usuário
		const isSamePassword = await user.checkPassword(password);
		if (!isSamePassword) {
			return emailOrPasswordIncorrect();
		}

		// Retorna os dados do usuário autenticado
		return response.status(201).json({
			id: user.id,
			email,
			name: user.name,
			admin: user.admin, // Indica se o usuário é administrador
			token: jwt.sign({ id: user.id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});
	}
}

export default new SessionController();
