const fs = require('fs');
const path = require('path');
//const Sequelize = require('sequelize');
const Sequelize = require('sequelize');
require('sequelize-hierarchy-ts')(Sequelize);
const process = require('process');

const { fileURLToPath } = require('url');
const { dirname } = require('path');
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(dirname(__filename));

const basename = path.basename(__filename);
const env = process.env.APP_ENV || 'development';

let config = require('../config/config.js');

console.log('APP_ENV = ', process.env.APP_ENV);
// console.log('config = ');
// console.log(config);
const db = {};

let sequelize;
let modelsync = { force: false, alter: false };
if (process.env.APP_ENV) {
  console.log(1);
  switch (process.env.APP_ENV) {
    case 'development':
      console.log('config = development');
      sequelize = new Sequelize(config.development);
      modelsync = { force: false, alter: true };
      break;
    case 'test':
      console.log('config = test');
      sequelize = new Sequelize(config.test);
      modelsync = { force: false, alter: false };
      break;
    case 'production':
      console.log('config = production');
      sequelize = new Sequelize(config.production);
      modelsync = { force: false, alter: false };
      break;
    case 'local':
      console.log('config = local');
      sequelize = new Sequelize(config.local);
      modelsync = { force: false, alter: true };
      break;
    //local
    default:
      sequelize = new Sequelize(config.development);
      break;
  }
  //sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log(2);
  sequelize = new Sequelize(config.development);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    console.log('file = ', file);
    //const model = require(path.join(__dirname, file))(
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// console.log('sequelize1 = ');
// console.log('sequelize2 = ', sequelize.config);
// console.log('sequelize2 = ', process.env.DB_DEVELOPMENT_DATABASE);

async function setupDB(db) {
  //console.log('db.sequelize = ', db.sequelize);
  //return await db.sequelize.sync();
  // return await db.sequelize.sync(modelsync);
  await db.sequelize.sync(modelsync);
  console.log('synced');
  // await db.Posts.rebuildHierarchy();
  if (process.env.APP_ENV === 'development') {
    console.log('rebuilding hierarchy');
    // await db.Posts.rebuildHierarchy();
  }
  return;
}

setupDB(db).then(console.log('db setup'));
// .catch(() => {
//   const error = new Error('could not instantiate database');
//   error.statusCode = 500;
//   throw error;
// });
//const ceated_db = await setupDB(db);

//db.SetupDB = SetupDB

module.exports = db;
