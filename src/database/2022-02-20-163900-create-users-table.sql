CREATE TABLE IF NOT EXISTS users (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL UNIQUE,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
