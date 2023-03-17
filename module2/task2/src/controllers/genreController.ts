import {IncomingMessage, ServerResponse} from 'http';
import {GenreService} from '../services/genreService';
import {getRequestBody} from "../tools/httpRequestUtils";

export class GenreController {
    constructor(private genreService: GenreService) {
    }

    async getAllGenres(req: IncomingMessage, res: ServerResponse) {
        try {
            const genres = await this.genreService.getAllGenres();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(genres));
            res.end();
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: err.message}));
            res.end();
        }
    }

    async getGenreById(req: IncomingMessage, res: ServerResponse) {
        try {
            const id = Number(req.url.split('/')[2]);
            const genre = await this.genreService.getGenreById(id);
            if (!genre) {
                res.statusCode = 404;
                res.end();
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(genre));
                res.end();
            }
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: err.message}));
            res.end();
        }
    }

    async createGenre(req: IncomingMessage, res: ServerResponse) {
        try {
            const {name} = await getRequestBody(req);
            const genre = await this.genreService.createGenre(name);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(genre));
            res.end();
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: err.message}));
            res.end();
        }
    }

    async updateGenre(req: IncomingMessage, res: ServerResponse) {
        try {
            const id = Number(req.url.split('/')[2]);
            const {name} = await getRequestBody(req);
            const genre = await this.genreService.updateGenre(id, name);
            if (!genre) {
                res.statusCode = 404;
                res.end();
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(genre));
                res.end();
            }
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: err.message}));
            res.end();
        }
    }

    async deleteGenre(req: IncomingMessage, res: ServerResponse) {
        try {
            const id = Number(req.url.split('/')[2]);
            const success = await this.genreService.deleteGenre(id);
            res.statusCode = 204;
            res.end();
        } catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.end();
        }
    }
}