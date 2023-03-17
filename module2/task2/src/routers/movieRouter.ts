import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'pg';
import { MovieController } from '../controllers/movieController';
import { MovieService } from '../services/movieService';

export const movieRouter = {
    async handleRequest(req: IncomingMessage, res: ServerResponse, pool: Pool) {
        const url = req.url;
        const controller = new MovieController(new MovieService(pool));

        if (req.method === 'GET' && url === '/movies') {
            await controller.getAllMovies(req, res);
        } else if (req.method === 'GET' && url.startsWith('/movies/')) {
            await controller.getMovieById(req, res);
        } else if (req.method === 'POST' && url === '/movies') {
            await controller.createMovie(req, res);
        } else if (req.method === 'PUT' && url.startsWith('/movies/')) {
            await controller.updateMovie(req, res);
        } else if (req.method === 'DELETE' && url.startsWith('/movies/')) {
            await controller.deleteMovie(req, res);
        } else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    }
};
