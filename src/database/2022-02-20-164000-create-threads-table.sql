CREATE TABLE IF NOT EXISTS threads (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    title character varying(255) NOT NULL,
    project character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
