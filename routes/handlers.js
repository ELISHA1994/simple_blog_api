import * as Blog from "../models/blog"
import * as Comment from  "../models/comment"

import model from '../config/database'

// Blog Handlers
export async function postBlog(req, res, next) {
    try {
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (err) {
        next(err);
    }
}

export async function postComment(req, res, next) {
    try {
        const comment = await Comment.create(req.body);
        res.json(comment);
    } catch (e) {
        next(e);
    }
}

export async function listBlogs(req, res, next) {

    const { offset = 0, limit = 25 } = req.query;

}


