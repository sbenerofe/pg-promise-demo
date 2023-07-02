const { products: sql } = require("../sql");

const cs = {};

const createColumnsets = (pgp) => {
  if (!cs.insert) {
    const table = new pgp.helpers.TableName({
      table: "products",
      schema: "public",
    });

    cs.insert = new pgp.helpers.ColumnSet(["name"], { table });
    cs.update = cs.insert.extend(["?id", "?user_id"]);
  }
  return cs;
};

const ProductsRepository = (db, pgp) => {
  createColumnsets(pgp);

  const create = () => db.none(sql.create);

  const drop = () => db.none(sql.drop);

  const empty = () => db.none(sql.empty);

  const add = (values) =>
    db.one(sql.add, {
      userId: +values.userId,
      productName: values.name,
    });

  const remove = (id) =>
    db.result("DELETE FROM products WHERE id = $1", +id, (r) => r.rowCount);

  const find = (values) =>
    db.oneOrNone(sql.find, {
      userId: +values.userId,
      productName: values.name,
    });

  const all = () => db.any("SELECT * FROM products");

  const total = () =>
    db.one("SELECT count(*) FROM products", [], (a) => +a.count);

  return {
    create,
    drop,
    empty,
    add,
    remove,
    find,
    all,
    total,
  };
};

module.exports = ProductsRepository;
