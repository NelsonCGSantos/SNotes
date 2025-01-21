module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Add a new UUID column called temp_id
    await queryInterface.addColumn("Users", "temp_id", {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    });

    // Step 2: Copy data from old integer id column to temp_id
    await queryInterface.sequelize.query(`
      UPDATE "Users" 
      SET "temp_id" = uuid_generate_v4();
    `);

    // Step 3: Drop the old id column
    await queryInterface.removeColumn("Users", "id");

    // Step 4: Rename temp_id to id and set it as primary key
    await queryInterface.renameColumn("Users", "temp_id", "id");
  },

  down: async (queryInterface, Sequelize) => {
    // Step 1: Add back the old id column as an integer
    await queryInterface.addColumn("Users", "temp_id", {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
    });

    // Step 2: Copy back any data
    await queryInterface.sequelize.query(`
      UPDATE "Users" 
      SET "temp_id" = nextval('"Users_id_seq"');
    `);

    // Step 3: Drop the new UUID id column
    await queryInterface.removeColumn("Users", "id");

    // Step 4: Rename temp_id back to id
    await queryInterface.renameColumn("Users", "temp_id", "id");
  }
};
