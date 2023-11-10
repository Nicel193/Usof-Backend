USE usof;

CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT,
    login VARCHAR(31) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    fullName VARCHAR(63) NOT NULL,
    profilePicture VARCHAR(63),
    rating INT(11) NOT NULL DEFAULT 0,
    roles VARCHAR(63) NOT NULL DEFAULT 'user',
    email VARCHAR(63) NOT NULL UNIQUE,
    isActivated BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tokens (
    id INT(11) AUTO_INCREMENT,
    login VARCHAR(31) NOT NULL UNIQUE,
    refreshTocken VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS posts (
    id INT(11) AUTO_INCREMENT,
    authorId INT(11) NOT NULL,
    authorLogin VARCHAR(31) NOT NULL,
    title VARCHAR(31) NOT NULL,
    publishDate DATETIME NOT NULL,
    isActive BOOLEAN NOT NULL,
    content TEXT NOT NULL,
    categories VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (authorId) REFERENCES users(id)
);

-- CREATE TABLE IF NOT EXISTS categories (
--     id INT(11) AUTO_INCREMENT,
--     title VARCHAR(31) NOT NULL,
--     description VARCHAR(255) NOT NULL,
--     PRIMARY KEY (id)
-- );