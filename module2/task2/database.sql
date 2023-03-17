CREATE TABLE genres
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE movies
(
    id    SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year  INTEGER
);

CREATE TABLE movie_genres
(
    id       SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies (id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres (id) ON DELETE CASCADE
);