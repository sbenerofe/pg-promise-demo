/*
    Creates table Users.
*/
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    username VARCHAR(225) NOT NULL UNIQUE,
    email VARCHAR(225) NOT NULL UNIQUE,
    hashed_password VARCHAR(84) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL  DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_test_update_at() RETURNS trigger AS $func$
    BEGIN
        IF NEW.* != OLD.* THEN NEW.updated_at := CURRENT_TIMESTAMP;
        END IF;
        RETURN NEW;
    END;
$func$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_last_edit
    BEFORE UPDATE ON users
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