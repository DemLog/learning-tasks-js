import {IncomingMessage, ServerResponse} from 'http';
import {MovieService} from '../services/movieService';
import {getRequestBody} from "../tools/httpRequestUtils";
import {Movie} from "../models/movie";

export class MovieController {
    constructor(private movieService: MovieService) {
    }

    async getAllMovies(req: IncomingMessage, res: ServerResponse) {
        try {
            const movies = await this.movieService.getAllMovies();
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(movies));
            res.end();
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: err.message}));
            res.end();
        }
    }

    async getMovieById(req: IncomingMessage, res: ServerResponse) {
        try {
            const movieId = Number(req.url.split('/')[2]);
            const movie = await this.movieService.getMovieById(movieId);
            if (!movie) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'Movie not found'}));
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(movie));
            res.end();
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: err.message}));
            res.end();
        }
    }

    async createMovie(req: IncomingMessage, res: ServerResponse) {
        try {
            const {title, year, genres} = await getRequestBody(req);
            if (!title || !year || !genres) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'Invalid request body'}));
                res.end();
                return;
            }
            const movieObj: Movie = {
                title: title,
                year: year,
                genres: genres
            };
            const newMovie = await this.movieService.createMovie(movieObj);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(newMovie));
            res.end();
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: err.message}));
            res.end();
        }
    }

    async updateMovie(req: IncomingMessage, res: ServerResponse) {
        try {
            const movieId = Number(req.url.split('/')[2]);
            const requestBody = await getRequestBody(req);
            const {title, year, genres} = JSON.parse(requestBody);
            if (!title || !year || !genres) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'Invalid request body'}));
                res.end();
                return;
            }

            const movieObj: Movie = {
                title: title,
                year: year,
                genres: genres
            };
            const updatedMovie = await this.movieService.updateMovie(movieId, movieObj);
            if (!updatedMovie) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'Movie not found'}));
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(updatedMovie));
            res.end();
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: err.message}));
            res.end();
        }
    }

    async deleteMovie(req: IncomingMessage, res: ServerResponse) {
        try {
            const movieId = Number(req.url.split('/')[2]);
            await this.movieService.deleteMovie(movieId);
            res.writeHead(204, {'Content-Type': 'application/json'});
            res.end();
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: err.message}));
            res.end();
        }
    }
}