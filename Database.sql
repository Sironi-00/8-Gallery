BEGIN;

CREATE TABLE users (
    id varchar(255) PRIMARY KEY,
    name varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    email varchar(255)
);

CREATE TABLE images (
    id varchar(255) PRIMARY KEY,
    artistId varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(255),
    url varchar(255) NOT NULL,
    upload_date datetime,
    likes INT DEFAULT 0,
    downloads INT DEFAULT 0
);

CREATE TABLE likedimages (
    imageId varchar(255),
    userId varchar(255),
    PRIMARY KEY (imageId, userId)
);

-- ALTER TABLE images
--     ADD FOREIGN KEY (artistId)
--     REFERENCES users (id)
--     ON DELETE CASCADE;

-- END;