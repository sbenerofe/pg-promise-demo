// import * as dotenv from 'dotenv';  see github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
//dotenv.config();

require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_DEVELOPMENT_USERNAME,
    password: process.env.DB_DEVELOPMENT_PASSWORD,
    database: process.env.DB_DEVELOPMENT_DATABASE,
    host: process.env.DB_DEVELOPMENT_HOST_RPI,
    port: process.env.DB_DEVELOPMENT_PORT || 5432,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_DATABASE,
    host: process.env.DB_TEST_HOST_RPI,
    port: process.env.DB_TEST_PORT || 5432,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_PRODUCTION_USERNAME,
    password: process.env.DB_PRODUCTION_PASSWORD,
    database: process.env.DB_PRODUCTION_DATABASE,
    host: process.env.DB_PRODUCTION_HOST_RPI,
    port: process.env.DB_PRODUCTION_PORT || 5432,
    dialect: 'postgres',
  },
  local: {
    username: process.env.DB_LOCAL_USERNAME,
    password: process.env.DB_LOCAL_PASSWORD,
    database: process.env.DB_LOCAL_DATABASE,
    host: process.env.DB_LOCAL_HOST_RPI,
    port: process.env.DB_LOCAL_PORT || 5432,
    dialect: 'postgres',
  },
};
