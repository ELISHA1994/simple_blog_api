import * as Blog from "../models/blog";
import * as Comment from "../models/comment";



/**
 * Blog Handlers Functions
 * @return {Function}
 */
export async function postBlog(req, res, next) {
    try {
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (err) {
        next(err);
    }
}

export async function getAllBlogs(req, res, next) {
    try {
        const blogs = await Blog.listAllBlogs();
        res.json(blogs)
    } catch (err) {
        next(err);
    }
}

export async function getBlogsPaginated(req, res, next) {
    try {
        const {offset, limit } = req.query
        const blogs = await Blog.listBlogsPaginated({ offset, limit });
        res.json(blogs)
    } catch (err) {
        next(err);
    }
}

export async function getBlogPost(req, res, next) {
    try {
        const { id } = req.params
        const blogPost = await Blog.getBlog(id)
        res.json(blogPost)
    } catch (err) {
        next(err);
    }
}

export async function updateBlogPost(req, res, next) {
    try {
        const change = req.body;
        const blog = await Blog.updateBlog(req.params.id, change)
        res.json(blog);
    } catch (err) {
        next(err);
    }
}

export async function deleteBlogPost(req, res, next) {
    try {
        const {id} = req.params;
        await Blog.deleteBlog(id);
        res.json({ success: true});
    } catch (err) {
        next(err);
    }
}


/**
 * Comment Handlers Functions
 * @return {Function}
 */

export async function addCommentHandler(req, res, next) {
    try {
        const comment = await Comment.postComment(req.body);
        res.json(comment);
    } catch (err) {
        next(err);
    }
}

export async function getCommentHandler(req, res, next) {
    try {
        const { id } = req.params
        const comment = await Comment.getComment(id);
        res.json(comment)
    } catch (err) {
        next(err);
    }
}

export async function getBlogPostCommentsHandler(req, res, next) {
    try {
        const {BlogId} = req.params;
        const comments = await Comment.getBlogPostComments(BlogId);
        res.json(comments);
    } catch (err) {
        next(err);
    }
}

export async function updateCommentHandler(req, res, next) {
    try {
        const change = req.body;
        const comment = await Comment.updateComment(req.params.id, change)
        res.json(comment);
    } catch (err) {
        next(err);
    }
}

export async function deleteCommentHandler(req, res, next) {
    try {
        const {id} = req.params;
        await Comment.deleteComment(id);
        res.json({ success: true});
    } catch (err) {
        next(err);
    }
}
