module.exports = (sequelize, Sequelize) => {
  const gestionSubEtalonnageModels = sequelize.define(
    'gestion_sub_etalonnages',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      etalonnageSub: {
        type: Sequelize.FLOAT,
      },
    }
  );

  return gestionSubEtalonnageModels;
};
