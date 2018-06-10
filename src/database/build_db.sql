BEGIN;
DROP TABLE IF EXISTS users;

CREATE TABLE staff (
id SERIAL PRIMARY KEY,
user_name  VARCHAR(50) NOT NULL UNIQUE CHECK (length(user_name) >= 4),
password VARCHAR(100) NOT NULL CHECK (length(password) >= 6),
email VARCHAR(50) NOT NULL UNIQUE CHECK(length(user_name) >= 5)
);

COMMIT;
