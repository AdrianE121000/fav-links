CREATE DATABASE fav_links_db;

USE fav_links_db;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(256) NOT NULL,
    fullname VARCHAR(256) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

CREATE TABLE links(
    id INT(16) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE links 
    ADD PRIMARY KEY (id);

ALTER TABLE links
    MODIFY id INT(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE links;