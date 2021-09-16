import model from "../config/database";
import DBG from 'debug';
const debug = DBG('blogs:blog-model-methods');
const error = DBG('blogs:error-model-methods');


export async function create(fields) {
    const {title, body} = fields;
    const newBlog = await model.Blog.create({
        title, body
    });
    return newBlog;
}
