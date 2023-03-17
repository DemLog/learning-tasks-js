import * as dotenv from 'dotenv'
import {createServer, IncomingMessage, ServerResponse} from 'http';
import { Pool } from 'pg';
import { genreRouter } from './routers/genreRouter';
import { movieRouter } from './routers/movieRouter';

dotenv.config();

const hostname = process.env.SERVER_HOSTNAME;
const port = Number(process.env.SERVER_PORT);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
});

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    if (url.startsWith('/genres')) {
        await genreRouter.handleRequest(req, res, pool);
    } else if (url.startsWith('/movies')) {
        await movieRouter.handleRequest(req, res, pool);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});