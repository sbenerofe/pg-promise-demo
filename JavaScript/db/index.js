const pgPromise = require("pg-promise"); // pg-promise core library
//const dbConfig = require("../../db-config.json"); // db connection details
const { Diagnostics } = require("./diagnostics"); // optional diagnostics
const { Users, Products } = require("./repos");

// const fs = require("fs");
// const path = require("path");
// //const Sequelize = require('sequelize');
// const Sequelize = require("sequelize");
// require("sequelize-hierarchy-ts")(Sequelize);
// const process = require("process");

// const { fileURLToPath } = require("url");
// const { dirname } = require("path");
// //const __filename = fileURLToPath(import.meta.url);
// //const __dirname = dirname(dirname(__filename));

// const basename = path.basename(__filename);
const env = process.env.APP_ENV || "development";

let config = require("../../config.js");

console.log("APP_ENV = ", process.env.APP_ENV);
// console.log('config = ');
// console.log(config);
let dbconfig;
let modelsync = { force: false, alter: false };
if (process.env.APP_ENV) {
  console.log(1);
  switch (process.env.APP_ENV) {
    case "development":
      console.log("config = development");
      dbconfig = config.development;
      break;
    case "test":
      console.log("config = test");
      dbconfig = config.test;
      break;
    case "production":
      console.log("config = production");
      dbconfig = config.production;
      break;
    case "local":
      console.log("config = local");
      dbconfig = config.local;
      break;
    //local
    default:
      console.log("config = default");
      dbconfig = config.development;
      break;
  }
  //sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log(2);
  dbconfig = config.development;
}

// pg-promise initialization options:
const initOptions = {
  // Extending the database protocol with our custom repositories;
  // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
  extend(obj, dc) {
    // Database Context (dc) is mainly useful when extending multiple databases with different access API-s.

    // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
    // which should be as fast as possible.
    obj.users = Users(obj, pgp);
    obj.products = Products(obj, pgp);
  },
};

// Initializing the library:
const pgp = pgPromise(initOptions);

// Creating the database instance:
const db = pgp(dbConfig);

// Initializing optional diagnostics:
Diagnostics.init(initOptions);

// Alternatively, you can get access to pgp via db.$config.pgp
// See: https://vitaly-t.github.io/pg-promise/Database.html#$config
module.exports = { db, pgp };
