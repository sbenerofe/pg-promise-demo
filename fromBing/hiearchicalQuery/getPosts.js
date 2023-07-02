const pgp = require("pg-promise")();
const db = pgp("postgres://username:password@host:port/database");

const getPostsSQL = new pgp.QueryFile("./getPosts.sql", { minify: true });

const getPosts = async (maxLevel, limit, minDate) => {
  const posts = await db.tx(async (t) => {
    return t.manyOrNone(getPostsSQL, { maxLevel, limit, minDate });
  });
  return posts;
};

getPosts(3, 10, "2022-01-01")
  .then((posts) => {
    console.log(posts);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
