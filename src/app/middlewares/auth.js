// Importa o módulo jsonwebtoken para manipulação de tokens JWT
import jwt from 'jsonwebtoken';
// Importa as configurações de autenticação, como a chave secreta
import authConfig from '../../config/auth';

// Função middleware para autenticação baseada em JWT
function authMiddleware(request, response, next) {
	// Obtém o token de autorização do cabeçalho da requisição
	const authToken = request.headers.authorization;

	// Verifica se o token foi fornecido
	if (!authToken) {
		return response.status(401).json({ error: 'Token não fornecido' }); // Retorna erro 401 se o token não estiver presente
	}

	// Extrai o token da string "Bearer <token>"
	const token = authToken.split(' ').at(1);

	try {
		// Verifica o token usando a chave secreta definida em authConfig
		jwt.verify(token, authConfig.secret, (err, decoded) => {
			if (err) {
				throw new Error(); // Se houver erro na verificação, lança uma exceção
			}

			// Se a verificação for bem-sucedida, armazena o ID do usuário decodificado na requisição
			request.userId = decoded.id;
			request.userName = decoded.name;
		});
	} catch (err) {
		// Retorna erro 401 se o token for inválido
		return response.status(401).json({ error: 'Token inválido' });
	}

	// Chama o próximo middleware ou rota se o token for válido
	return next();
}

// Exporta o middleware de autenticação
export default authMiddleware;
