const { users: sql } = require("../sql");

const cs = {}; // Reusable ColumnSet objects.

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class UsersRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;

    // set-up all ColumnSet objects, if needed:
    createColumnsets(pgp);
  }

  // Creates the table;
  create() {
    return this.db.none(sql.create);
  }

  // Initializes the table with some user records, and return their id-s;
  init() {
    return this.db.map(sql.init, [], (row) => row.id);
  }

  // Drops the table;
  drop() {
    return this.db.none(sql.drop);
  }

  // Removes all records from the table;
  empty() {
    return this.db.none(sql.empty);
  }

  //Udpate user based on id

  // Although column details can be taken from the data object, it is not
  // a likely scenario for an update, unless updating the whole table:

  // pgp.helpers.update(dataSingle, null, 'my-table');
  //=> UPDATE "my-table" SET "id"=1,"val"=123,"msg"='hello'
  update(id, username, email, hashed_password) {
    return this.db.oneOrNone(sql.update,id, username, email, hashed_password);
  }

  // Adds a new user, and returns the new object;
  add(username, email, hashed_password) {
    return this.db.one(sql.add, username, email, hashed_password);
  }

  // Tries to delete a user by id, and returns the number of records deleted;
  remove(id) {
    return this.db.result(
      "DELETE FROM users WHERE id = $1",
      +id,
      (r) => r.rowCount
    );
  }

  // Tries to find a user from id;
  findById(id) {
    return this.db.oneOrNone("SELECT * FROM users WHERE id = $1", +id);
  }

  // Tries to find a user from name;
  findByName(username) {
    return this.db.oneOrNone(
      "SELECT * FROM users WHERE username = $1",
      username
    );
  }

  // Returns all user records;
  all() {
    return this.db.any("SELECT * FROM users");
  }

  // Returns the total number of users;
  total() {
    return this.db.one("SELECT count(*) FROM users", [], (a) => +a.count);
  }
}

//////////////////////////////////////////////////////////
// Example of statically initializing ColumnSet objects:

function createColumnsets(pgp) {
  // create all ColumnSet objects only once:
  if (!cs.insert) {
    // Type TableName is useful when schema isn't default "public" ,
    // otherwise you can just pass in a string for the table name.
    const table = new pgp.helpers.TableName({
      table: "users",
      schema: "public",
    });

    cs.insert = new pgp.helpers.ColumnSet(["name"], { table });
    cs.update = cs.insert.extend(["?id"]);
  }
  return cs;
}

module.exports = UsersRepository;
