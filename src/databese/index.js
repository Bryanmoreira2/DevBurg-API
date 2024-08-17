// Importações necessárias
import Sequelize from 'sequelize';
import Product from '../app/models/Product';
import User from '../app/models/User';
import configDatabase from '../config/database';

const models = [User, Product]; // Array de modelos

class Database {
	constructor() {
		this.init(); // Inicializa a conexão com o banco de dados
	}

	init() {
		this.connection = new Sequelize(configDatabase); // Cria a conexão
		models.map((model) => model.init(this.connection)); // Inicializa os modelos
	}
}

export default new Database(); // Exporta a instância do banco de dados
