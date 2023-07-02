const express = require("express");
const { db } = require("./db");

/////////////////////////////////////////////////////////////////////////////
// IMPORTANT:
//
// Do not re-use the HTTP-service part of the code from here!
// It is an over-simplified HTTP service with just GET handlers, because:
//
// 1. This demo is to be tested by typing URL-s manually in the browser;
// 2. The focus here is on a proper database layer only, not an HTTP service.
/////////////////////////////////////////////////////////////////////////////

const app = express();

//////////////////////////////////////////////
// Users Web API
//////////////////////////////////////////////

// create table Users:
GET("/users/create", () => db.users.create());

// add some initial records:
GET("/users/init", () => db.users.init());

// remove all records from the table:
GET("/users/empty", () => db.users.empty());

// drop the table:
GET("/users/drop", () => db.users.drop());

// add a new user, if it doesn't exist yet, and return the object:
GET("/users/add/:username/:email/:password", (req) => {
  return db.task("add-user", async (t) => {
    const newUser = {
      username: req.params.username,
      email: req.params.email,
      hashed_password: req.params.password,
    };
    const user = await t.users.findByName(newUser.username);
    return user || t.users.add(newUser);
  });
});

GET("/users/update/:username/:email/:password", (req) => {
  return db.task("update-user", async (t) => {
    const updatedUser = {
      id: null,
      username: req.params.username,
      email: req.params.email,
      hashed_password: req.params.password,
    };
    const user = await t.users.findByName(updatedUser.username);
    console.log(" user = ", user);
    if (!user) {
      return null;
    } else {
      updatedUser.id = user.id;
    }
    console.log("updated user = ", updatedUser);
    const updated = await t.users.update(updatedUser);
    console.log("updated user = ", updated);
    // return user || t.users.update(updatedUser);
    return t.users.update(updatedUser);
  });
});

// find a user by id:
GET("/users/find/:id", (req) => db.users.findById(req.params.id));

// remove a user by id:
GET("/users/remove/:id", (req) => db.users.remove(req.params.id));

// get all users:
GET("/users/all", () => db.users.all());

// count all users:
GET("/users/total", () => db.users.total());

//////////////////////////////////////////////
// Products Web API
//////////////////////////////////////////////

// create table Products:
GET("/products/create", () => db.products.create());

// drop the table:
GET("/products/drop", () => db.products.drop());

// remove all products:
GET("/products/empty", () => db.products.empty());

// add a new user product, if it doesn't exist yet, and return the object:
GET("/products/add/:userId/:name", (req) => {
  return db.task("add-product", async (t) => {
    const product = await t.products.find(req.params);
    return product || t.products.add(req.params);
  });
});

// find a product by user id + product name id:
GET("/products/find/:userId/:name", (req) => db.products.find(req.params));

// remove a product by id:
GET("/products/remove/:id", (req) => db.products.remove(req.params.id));

// get all products:
GET("/products/all", () => db.products.all());

// count all products:
GET("/products/total", () => db.products.total());

/////////////////////////////////////////////
// Express/server part;
/////////////////////////////////////////////

// Generic GET handler;
function GET(url, handler) {
  app.get(url, async (req, res) => {
    try {
      const data = await handler(req);
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      res.json({
        success: false,
        error: error.message || error,
      });
    }
  });
}

const port = 7000;

app.listen(port, () => {
  console.log("\nReady for GET requests on http://localhost:" + port);
});
