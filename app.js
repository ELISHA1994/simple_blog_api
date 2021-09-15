import * as http from "http";
import * as path from "path";
import express from "express";
import cors from "cors";
import { default as logger } from "morgan";
import dotenv from "dotenv/config";
import { default as rfs } from 'rotating-file-stream';
import { approotdir } from './approotdir.js';
const __dirname = approotdir;
import {
    normalizePort,
    onError,
    onListening,
    handle404,
    basicErrorHandler
} from './appsupport.js';
import { default as DBG } from 'debug';
const debug = DBG('blogs:debug');
const dbgerror = DBG('blogs:error');

// Initialize the express app object
export const app = express();

export const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Middlewares
app.use(cors());
app.use(express.json());

app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev',  {
    stream: process.env.REQUEST_LOG_FILE ?
        rfs.createStream(process.env.REQUEST_LOG_FILE, {
            size: '10M',     // rotate every 10 MegaBytes written
            interval: '1d',  // rotate daily
            compress: 'gzip',
            path: path.join(__dirname, 'logs')
        })
        : process.stdout
}));





// Not Found and Error Middleware
// error handlers
// catch 404 and forward to error handler
app.use(handle404);
app.use(basicErrorHandler);


export const server = http.createServer(app);
server.listen(port);


server.on('request', (req, res) => {
    debug(`${new Date().toISOString()} request: ${req.method} ${req.url}`);
})
server.on('error', onError);
server.on('listening', onListening);
