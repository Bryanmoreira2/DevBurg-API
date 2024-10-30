// Importações necessárias
import Sequelize from "sequelize";
import Product from "../app/models/Product";
import Category from "../app/models/Category";
import User from "../app/models/User";
import configDatabase from "../config/database";
import mongoose from "mongoose";

const models = [User, Product, Category]; // Array de modelos

class Database {
	constructor() {
		this.init(); // Inicializa a conexão com o banco de dados
		this.mongo();
	}

	init() {
		this.connection = new Sequelize(configDatabase); // Cria a conexão
		models
			.map((model) => model.init(this.connection))
			.map((model) => model.associate && model.associate(this.connection.models)); // Inicializa os modelos
	}

	mongo(){
		this.mongoConnection  = mongoose.connect(
			'mongodb://localhost:27027/devburger',

		);
	}
}

export default new Database(); // Exporta a instância do banco de dados
