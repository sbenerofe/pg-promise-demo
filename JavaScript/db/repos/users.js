const { users: sql } = require("../sql");

const cs = {};

const createColumnsets = (pgp) => {
  if (!cs.insert) {
    const table = new pgp.helpers.TableName({
      table: "users",
      schema: "public",
    });

    cs.insert = new pgp.helpers.ColumnSet(["name"], { table });
    cs.update = cs.insert.extend(["?id"]);
  }
  return cs;
};

const UsersRepository = (db, pgp) => {
  createColumnsets(pgp);

  const create = () => db.none(sql.create);

  const init = () => db.map(sql.init, [], (row) => row.id);

  const drop = () => db.none(sql.drop);

  const empty = () => db.none(sql.empty);

  const update = (id, username, email, hashed_password) =>
    db.oneOrNone(sql.update, id, username, email, hashed_password);

  const add = (username, email, hashed_password) =>
    db.one(sql.add, username, email, hashed_password);

  const remove = (id) =>
    db.result("DELETE FROM users WHERE id = $1", +id, (r) => r.rowCount);

  const findById = (id) =>
    db.oneOrNone("SELECT * FROM users WHERE id = $1", +id);

  const findByName = (username) =>
    db.oneOrNone("SELECT * FROM users WHERE username = $1", username);

  const all = () => db.any("SELECT * FROM users");

  const total = () => db.one("SELECT count(*) FROM users", [], (a) => +a.count);

  return {
    create,
    init,
    drop,
    empty,
    update,
    add,
    remove,
    findById,
    findByName,
    all,
    total,
  };
};

module.exports = UsersRepository;
