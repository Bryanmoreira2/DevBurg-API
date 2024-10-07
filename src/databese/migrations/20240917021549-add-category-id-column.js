/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('products', 'category_id', {
			type: Sequelize.INTEGER,

			references: {
				model: 'categories', // Tabela de referência
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL',
			allowNull: true,
		});
	},

	async down(queryInterface) {
		await queryInterface.removeColumn('products', 'category_id');
	},
};
