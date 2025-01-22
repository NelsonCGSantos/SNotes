"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Notes"
      ADD COLUMN search_vector tsvector 
      GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, ''))
      ) STORED;
    `);

    await queryInterface.sequelize.query(`
      CREATE INDEX notes_search_idx 
      ON "Notes" USING GIN(search_vector);
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS notes_search_idx;`);
    await queryInterface.sequelize.query(`ALTER TABLE "Notes" DROP COLUMN search_vector;`);
  },
};
