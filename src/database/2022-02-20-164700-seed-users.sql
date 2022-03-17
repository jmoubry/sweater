CREATE TEMP TABLE seed_data (
    username character varying(255), 
    email character varying(255)
);

INSERT INTO seed_data (username, email) VALUES
('Jami', 'jami@moubry.com'),
('Sean', 'sean@moubry.com');


INSERT INTO users (username, email, "createdAt", "updatedAt")
SELECT username, email, NOW(), NOW()
FROM seed_data
WHERE NOT EXISTS (SELECT id FROM users);

DROP TABLE seed_data;