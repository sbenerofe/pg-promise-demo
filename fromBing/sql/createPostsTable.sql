CREATE TABLE posts (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title varchar(1023) NOT NULL,
    content text NOT NULL CHECK (char_length(content) <= 10000),
    user_id uuid NOT NULL REFERENCES users(id),
    parent_id uuid REFERENCES posts(id)
);

