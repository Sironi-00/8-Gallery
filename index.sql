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
    likes INT DEFAULT 0
);

-- ALTER TABLE images
--     ADD FOREIGN KEY (artistId)
--     REFERENCES users (id)
--     ON DELETE CASCADE;

-- END;


-- Users
INSERT INTO users (id, name, password, email) 
VALUES ('user-1', '[PH]artist_1', 'secret', NULL);

INSERT INTO users (id, name, password, email) 
VALUES ('user-2', '[PH]artist_2', 'secret', NULL);

INSERT INTO users (id, name, password, email) 
VALUES ('user-3', '[PH]artist_3', 'secret', NULL);

INSERT INTO users (id, name, password, email) 
VALUES ('user-4', '[PH]artist_4', 'secret', NULL);

INSERT INTO users (id, name, password, email) 
VALUES ('user-5', '[PH]artist_5', 'secret', NULL);

INSERT INTO users (id, name, password, email) 
VALUES ('user-6', '[PH]artist_6', 'secret', NULL);

-- Images
BEGIN;

INSERT INTO images (id, artistId, name, description, url)
VALUES ('13qgA', 'user-1', 'Test image', '[PH]image description', 'http://localhost:3000/images/1337500.png');

INSERT INTO images (id, artistId, name, description, url)
VALUES ('14dxE', 'user-2', 'Test image 2', '[PH]image description', 'http://localhost:3000/images/1330715.png');
    
INSERT INTO images (id, artistId, name, description, url)
VALUES ('15dxE', 'user-3', 'Test image 3', '[PH]image description', 'http://localhost:3000/images/979445.jpg');
    
INSERT INTO images (id, artistId, name, description, url)
VALUES ('16dxE', 'user-4', 'Test image 4', '[PH]image description', 'http://localhost:3000/images/763794.png');
    
INSERT INTO images (id, artistId, name, description, url)
VALUES ('17qgA', 'user-1', 'Test image 5', '[PH]image description', 'http://localhost:3000/images/1345266.png');

INSERT INTO images (id, artistId, name, description, url)
VALUES ('18dxE', 'user-2', 'Test image 6', '[PH]image description', 'http://localhost:3000/images/521718.jpg');
    
INSERT INTO images (id, artistId, name, description, url)
VALUES ('19dxE', 'user-3', 'Test image 7', '[PH]image description', 'http://localhost:3000/images/1330260.png');
    
INSERT INTO images (id, artistId, name, description, url)
VALUES ('11dxC', 'user-4', 'Test image 8', '[PH]image description', 'http://localhost:3000/images/1312115.jpg');
    
INSERT INTO images (id, artistId, name, description, url)
VALUES ('12qgC', 'user-1', 'Test image 9', '[PH]image description', 'http://localhost:3000/images/1337500.png');

INSERT INTO images (id, artistId, name, description, url)
VALUES ('13dxC', 'user-2', 'Test image 10', '[PH]image description', 'http://localhost:3000/images/1330715.png');
    
INSERT INTO images (id, artistId, name, description, url)
VALUES ('14dxC', 'user-3', 'Test image 11', '[PH]image description', 'http://localhost:3000/images/979445.jpg');
    
INSERT INTO images (id, artistId, name, description, url)
VALUES ('15dxC', 'user-4', 'Test image 12', '[PH]image description', 'http://localhost:3000/images/763794.png');
    
INSERT INTO images (id, artistId, name, description, url)
VALUES ('16qgC', 'user-1', 'Test image 13', '[PH]image description', 'http://localhost:3000/images/1345266.png');

INSERT INTO images (id, artistId, name, description, url)
VALUES ('17dxE', 'user-2', 'Test image 14', '[PH]image description', 'http://localhost:3000/images/521718.jpg');
    
INSERT INTO images (id, artistId, name, description, url)
VALUES ('18dxC', 'user-3', 'Test image 15', '[PH]image description', 'http://localhost:3000/images/1330260.png');
    
INSERT INTO images (id, artistId, name, description, url)
VALUES ('19dxC', 'user-4', 'Test image 16', '[PH]image description', 'http://localhost:3000/images/1312115.jpg');
