CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    password varchar(255) UNIQUE NOT NULL,
    hashed_password text NOT NULL
);
