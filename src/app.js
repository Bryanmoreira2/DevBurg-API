import { resolve } from 'node:path';
// Importações necessárias
import express from 'express';
import './databese'; // Inicializa a conexão com o banco de dados
import routes from './routes';

class App {
	constructor() {
		this.app = express(); // Cria a aplicação Express
		this.middlewares(); // Configura middlewares
		this.routes(); // Configura rotas
	}

	middlewares() {
		this.app.use(express.json()); // Middleware para parsing de JSON
		this.app.use('/products-file', express.static(resolve(__dirname, '..', 'uploads')));
	}

	routes() {
		this.app.use(routes); // Usa as rotas definidas
	}
}

export default new App().app; // Exporta a aplicação Express
