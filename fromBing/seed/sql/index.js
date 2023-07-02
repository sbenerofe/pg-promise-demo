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

const seedUsersTable = sql("./sql/seedUsersTable.sql");
const seedPostsTable = sql("./sql/seedPostsTable.sql");
const seedModeratorsTable = sql("./sql/seedModeratorsTable.sql");

async function seedTables() {
  try {
    await db.tx(async (t) => {
      await t.none(seedUsersTable);
      await t.none(seedPostsTable);
      await t.none(seedModeratorsTable);
    });
    console.log("Tables seeded successfully");
  } catch (error) {
    console.log("Error seeding tables:", error);
  }
}

seedTables();
