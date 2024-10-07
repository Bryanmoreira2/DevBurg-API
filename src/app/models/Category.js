import Sequelize, { Model } from "sequelize";
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

		return this;
	}
}

export default Category;
