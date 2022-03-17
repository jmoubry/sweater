CREATE TEMP TABLE seed_data (
    title character varying(255), 
    project character varying(255), 
    "status" character varying(255)
);

INSERT INTO seed_data (title, project, "status") VALUES 
('Chat', 'SweaterApp', 'Open'),
('Notifications', 'SweaterApp', 'Open'),
('Threads', 'SweaterApp', 'Open');

INSERT INTO threads (title, project, "status", "createdAt", "updatedAt")
SELECT title, project, "status", NOW(), NOW()
FROM seed_data
WHERE NOT EXISTS (SELECT id FROM threads);

DROP TABLE seed_data;