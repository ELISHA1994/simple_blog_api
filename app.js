import * as http from "http";
import * as path from "path";
import express from "express";
import cors from "cors";
import * as handlers from "./routes/handlers";
import { default as logger } from "morgan";
// import dotenv from "dotenv/config";
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

import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import SwaggerDoc from './swagger.json'


// Initialize the express app object
export const app = express();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog API Documentation",
            version: "0.1.0",
            description:
                "This is a sample CRUD API to be consumed in building blog apps",
            contact: {
                name: "Elisha Dutse Bello",
                email: "elishabello2014@gmail.com",
            }
        },
        servers: [
            {
                url: "http://localhost:4000/blogs",
            },
        ],
    },
    apis: ["./routes/blog.js"]
};

// const specs = swaggerJsdoc();
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(SwaggerDoc, { explorer: true })
);


export const port = normalizePort(process.env.PORT || '4000');
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

app.get('/status', function (req, res, net) {
    return res.status(200).json({ msg: 'Server is up and running !'})
})

// Blog End-Point
app.post('/blog', handlers.postBlog);
app.get('/blogs', handlers.getAllBlogs);
app.get('/blogs-paginated', handlers.getBlogsPaginated);
app.get('/blogs/:id', handlers.getBlogPost);
app.put('/blog/:id', handlers.updateBlogPost);
app.delete('/blogs/:id', handlers.deleteBlogPost);

// Comment End-Point
app.post('/add-comments', handlers.addCommentHandler);
app.get('/get-comment/:id', handlers.getCommentHandler);
app.get('/get-all-comments-on-blogpost/:BlogId', handlers.getBlogPostCommentsHandler);
app.put('/update-comments/:id', handlers.updateCommentHandler);
app.delete('/delete-comments/:id', handlers.deleteCommentHandler);


/**
 * Not Found and Error Middleware
 * Error Handlers
 * Catch 404 and forward to error handler
 * @params {Function}
 */
app.use(handle404);
app.use(basicErrorHandler);


export const server = http.createServer(app);
server.listen(port);


server.on('request', (req, res) => {
    debug(`${new Date().toISOString()} request: ${req.method} ${req.url}`);
})
server.on('error', onError);
server.on('listening', onListening);
