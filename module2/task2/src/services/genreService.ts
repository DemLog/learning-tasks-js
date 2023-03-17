import {Pool} from "pg";
import {Genre} from "../models/genre";

export class GenreService {

    private readonly pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async getAllGenres(): Promise<Genre[]> {
        const client = await this.pool.connect();

        try {
            const result = await client.query('SELECT * FROM genres');
            return result.rows as Genre[];
        } finally {
            client.release();
        }
    }

    async getGenreById(id: number): Promise<Genre | null> {
        const client = await this.pool.connect();

        try {
            const result = await client.query('SELECT * FROM genres WHERE id = $1', [id]);
            return result.rows[0] as Genre;
        } finally {
            client.release();
        }
    }

    async createGenre(name: string): Promise<Genre> {
        const client = await this.pool.connect();

        try {
            const result = await client.query(
                'INSERT INTO genres (name) VALUES ($1) RETURNING *',
                [name]
            );
            return result.rows[0] as Genre;
        } finally {
            client.release();
        }
    }

    async updateGenre(id: number, name: string): Promise<Genre | null> {
        const client = await this.pool.connect();

        try {
            const result = await client.query(
                'UPDATE genres SET name = $1 WHERE id = $2 RETURNING *',
                [name, id]
            );
            return result.rows[0] as Genre;
        } finally {
            client.release();
        }
    }

    async deleteGenre(id: number): Promise<void> {
        const client = await this.pool.connect();

        try {
            await client.query('DELETE FROM genres WHERE id = $1', [id]);
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
}