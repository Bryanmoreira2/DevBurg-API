import Sequelize, { Model } from 'sequelize';
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class Category extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
			},
			{
				sequelize,
			},
		);
	}
}

export default Category;
