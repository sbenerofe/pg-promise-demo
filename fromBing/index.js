const pgp = require("pg-promise")({
  query(e) {
    console.log("QUERY:", e.query);
  },
});
const db = pgp(
  "postgres://${username}:${password}@${host}:${port}/${database}"
);
const QueryFile = pgp.QueryFile;

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

const createUsersTable = sql("./sql/createUsersTable.sql");
const createPostsTable = sql("./sql/createPostsTable.sql");
const createCategoriesTable = sql("./sql/createCategoriesTable.sql");
const createModeratorsTable = sql("./sql/createModeratorsTable.sql");

async function createTables() {
  try {
    await db.tx(async (t) => {
      await t.none(createUsersTable);
      await t.none(createPostsTable);
      await t.none(createCategoriesTable);
      await t.none(createModeratorsTable);
    });
    console.log("Tables created successfully");
  } catch (error) {
    console.log("Error creating tables:", error);
  }
}

createTables();
