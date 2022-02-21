CREATE TABLE IF NOT EXISTS chats (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    thread_id bigint NOT NULL REFERENCES threads(id),
    user_id bigint NOT NULL REFERENCES users(id),
    parent_chat_id bigint REFERENCES chats(id),
    message character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
