
CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    color VARCHAR(50) NOT NULL,
    status_delete BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status_id INTEGER NOT NULL,
    status_delete BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_status
        FOREIGN KEY (status_id) 
        REFERENCES status(id)
        ON DELETE RESTRICT
);


INSERT INTO status (id, title, color, status_delete)
VALUES 
    (1, 'To Do', '#bee3f8', 'false'),
    (2, 'In Progress', '#fed7d7', 'false'),
    (3, 'Review', '#feebc8', 'false'),
    (4, 'Done', '#c6f6d5', 'false')
	ON CONFLICT (id) DO NOTHING;;
