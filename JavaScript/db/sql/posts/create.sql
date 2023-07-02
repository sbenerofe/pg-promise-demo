/*
    Creates table Users.
*/
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    title VARCHAR(225) NOT NULL,
    email VARCHAR(225) NOT NULL UNIQUE,
    content VARCHAR(10000),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL  DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE TRIGGER update_last_edit
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_test_update_at();

-- CREATE OR REPLACE FUNCTION update_changetimestamp_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--    NEW.changetimestamp = now(); 
--    RETURN NEW;
-- END;
-- $$ language 'plpgsql';


    -- CREATE TRIGGER update_ab_changetimestamp BEFORE UPDATE
    -- ON ab FOR EACH ROW EXECUTE PROCEDURE 
    -- update_changetimestamp_column();