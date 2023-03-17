import { IncomingMessage, ServerResponse } from 'http';
import { Pool } from 'pg';
import { GenreController } from '../controllers/genreController';
import { GenreService } from '../services/genreService';

export const genreRouter = {
    async handleRequest(req: IncomingMessage, res: ServerResponse, pool: Pool) {
        const url = req.url;
        const controller = new GenreController(new GenreService(pool));

        if (req.method === 'GET' && url === '/genres') {
            await controller.getAllGenres(req, res);
        } else if (req.method === 'GET' && url.startsWith('/genres/')) {
            await controller.getGenreById(req, res);
        } else if (req.method === 'POST' && url === '/genres') {
            await controller.createGenre(req, res);
        } else if (req.method === 'PUT' && url.startsWith('/genres/')) {
            await controller.updateGenre(req, res);
        } else if (req.method === 'DELETE' && url.startsWith('/genres/')) {
            await controller.deleteGenre(req, res);
        } else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    }
};