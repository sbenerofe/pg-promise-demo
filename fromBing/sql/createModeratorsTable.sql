CREATE TABLE moderators (
    user_id uuid NOT NULL REFERENCES users(id),
    post_id uuid NOT NULL REFERENCES posts(id),
    PRIMARY KEY (user_id, post_id)
);

