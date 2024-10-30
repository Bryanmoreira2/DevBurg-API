import Sequelize, { Model } from "sequelize";
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class Category extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				path: Sequelize.STRING, // Campo 'path' do tipo string

				// Campo virtual 'url' que não é armazenado no banco de dados
				url: {
					type: Sequelize.VIRTUAL,
					// Define um getter para gerar a URL com base no campo 'path'
					get() {
						return `http://localhost:3001/category-file/${this.path}`;
					},
				},
			},
			{
				sequelize,
			},
		);

		return this;
	}
}

export default Category;
