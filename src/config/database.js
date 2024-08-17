// Configuração do Sequelize para PostgreSQL
module.exports = {
	dialect: 'postgres', // Dialeto do banco de dados
	host: 'localhost', // Host do banco de dados
	port: 5432, // Porta do banco de dados
	username: 'postgres', // Nome de usuário
	password: 'postgres', // Senha
	database: 'devburg', // Nome do banco de dados
	define: {
		timestamps: true, // Adiciona createdAt e updatedAt automaticamente
		underscored: true, // Utiliza snake_case nas colunas
		underscoredAll: true, // Utiliza snake_case nas tabelas
	},
};
