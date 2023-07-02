/*
    Inserts a new User record.
*/
INSERT INTO users(username, email, hashed_password)
VALUES(${username}, ${email}, ${hashed_password})
RETURNING *
