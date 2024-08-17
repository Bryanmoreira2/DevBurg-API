import Sequelize, { Model } from 'sequelize';
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class Product extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				price: Sequelize.STRING,
				category: Sequelize.STRING,
				path: Sequelize.STRING,
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `http://localhost:3001/products-file/${this.path}`;
					},
				},
			},
			{
				sequelize,
			},
		);
	}
}

export default Product;
