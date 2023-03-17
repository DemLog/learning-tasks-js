CREATE TABLE person
(
    id         SERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    birthdate  DATE,
    birthplace TEXT,
    profession TEXT
);

CREATE TABLE genre
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE country
(
    id   SERIAL PRIMARY KEY,
    name TEXT UNIQUE
);

CREATE TABLE film
(
    id               SERIAL PRIMARY KEY,
    title            TEXT NOT NULL,
    year             INTEGER,
    slogan           TEXT,
    budget           BIGINT,
    marketing        BIGINT,
    world_box_office BIGINT,
    premiere         DATE,
    duration         INTERVAL,
    director_id      INTEGER REFERENCES person (id),
    screenplay_id    INTEGER REFERENCES person (id),
    producer_id      INTEGER REFERENCES person (id),
    operator_id      INTEGER REFERENCES person (id),
    composer_id      INTEGER REFERENCES person (id),
    artist_id        INTEGER REFERENCES person (id),
    editor_id        INTEGER REFERENCES person (id),
    country_id       INTEGER REFERENCES country (id)
);

CREATE TABLE film_genre
(
    film_id  INTEGER REFERENCES film (id),
    genre_id INTEGER REFERENCES genre (id),
    PRIMARY KEY (film_id, genre_id)
);

CREATE TABLE film_person
(
    film_id   INTEGER REFERENCES film (id),
    person_id INTEGER REFERENCES person (id),
    role      TEXT,
    PRIMARY KEY (film_id, person_id)
);

CREATE TABLE film_audience
(
    film_id    INTEGER REFERENCES films (id),
    country_id INTEGER REFERENCES country (id),
    audience   INTEGER,
    PRIMARY KEY (film_id, film_id)
);