// Importa Sequelize e a classe Model do Sequelize
import Sequelize, { Model } from "sequelize";

// Define a classe Product que extende a classe Model do Sequelize
// biome-ignore lint/complexity/noStaticOnlyClass: Classe contém apenas métodos estáticos, recomendado para evitar instâncias desnecessárias.
class Product extends Model {
	// Método estático init para inicializar o modelo
	static init(sequelize) {
		super.init(
			{
				// Define os campos do modelo Product
				name: Sequelize.STRING, // Campo 'name' do tipo string
				price: Sequelize.STRING, // Campo 'price' do tipo string
				path: Sequelize.STRING, // Campo 'path' do tipo string

				// Campo virtual 'url' que não é armazenado no banco de dados
				url: {
					type: Sequelize.VIRTUAL,
					// Define um getter para gerar a URL com base no campo 'path'
					get() {
						return `http://localhost:3001/products-file/${this.path}`;
					},
				},
			},
			{
				sequelize, // Conexão com a instância do Sequelize
			},
		);
		return this;
	}

	static associate(models) {
		this.belongsTo(models.Category, {
			foreignKey: "category_id",
			as: "category",
			
		})
	}
}

// Exporta o modelo Product
export default Product;
