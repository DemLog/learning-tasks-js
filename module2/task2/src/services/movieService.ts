import {Pool} from 'pg';
import {Movie} from '../models/movie';

export class MovieService {
    private readonly pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async getAllMovies(): Promise<Movie[]> {
        const query = `
            SELECT m.*, array_agg(g.name) AS genres
            FROM movies m
            LEFT JOIN movie_genres mg ON m.id = mg.movie_id
            LEFT JOIN genres g ON mg.genre_id = g.id
            GROUP BY m.id;
        `;
        const client = await this.pool.connect();

        try {
            const result = await client.query(query);
            return result.rows as Movie[];
        } finally {
            client.release();
        }
    }

    async getMovieById(id: number): Promise<Movie | null> {
        const query = `
            SELECT m.*, array_agg(g.name) AS genres
            FROM movies m
            LEFT JOIN movie_genres mg ON m.id = mg.movie_id
            LEFT JOIN genres g ON mg.genre_id = g.id
            WHERE m.id = $1
            GROUP BY m.id;
        `;
        const client = await this.pool.connect();

        try {
            const result = await client.query(query, [id]);
            return result.rows[0] as Movie || null;
        } finally {
            client.release();
        }
    }

    async createMovie(movie: Movie): Promise<Movie> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');
            const result = await client.query(
                'INSERT INTO movies (title, year) VALUES ($1, $2) RETURNING id',
                [movie.title, movie.year]
            );
            const movieId = result.rows[0].id;

            if (movie.genres.length) {
                await client.query(
                    'INSERT INTO movie_genres (movie_id, genre_id) VALUES ($1, unnest($2::int[]))',
                    [movieId, movie.genres]
                );
            }

            await client.query('COMMIT');
            return {...movie, id: movieId};
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async updateMovie(id: number, movie: Movie): Promise<Movie> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');

            const result = await client.query(
                'UPDATE movies SET title = $1, year = $2 WHERE id = $3 RETURNING *',
                [movie.title, movie.year, id]
            );

            if (movie.genres.length) {
                await client.query('DELETE FROM movie_genres WHERE movie_id = $1', [id]);
                await client.query(
                    'INSERT INTO movie_genres (movie_id, genre_id) VALUES ($1, unnest($2::int[]))',
                    [id, movie.genres]
                );
            } else {
                await client.query('DELETE FROM movie_genres WHERE movie_id = $1', [id]);
            }

            await client.query('COMMIT');
            return result.rows[0] as Movie;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async deleteMovie(id: number): Promise<void> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');
            await client.query('DELETE FROM movie_genres WHERE movie_id = $1', [id]);
            await client.query('DELETE FROM movies WHERE id = $1', [id]);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}