import bcrypt from 'bcrypt';
// Importações necessárias
import Sequelize, { Model } from 'sequelize';

// Define o modelo User
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class User extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING, // Coluna 'name'
				email: Sequelize.STRING, // Coluna 'email'
				password: Sequelize.VIRTUAL,
				password_hash: Sequelize.STRING, // Coluna 'password_hash'
				admin: Sequelize.BOOLEAN, // Coluna 'admin'
			},
			{
				sequelize, // Conexão com o banco de dados
			},
		);

		this.addHook('beforeSave', async (user) => {
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 10);
			}
		});
		return this;
	}
	async checkPassword(password) {
		return bcrypt.compare(password, this.password_hash);
	}
}

export default User; // Exporta o modelo User
