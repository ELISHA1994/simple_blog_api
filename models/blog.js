import database from "../config/database"
import cuid from "cuid";

const Blog = database.model('Blog', {
    _id: { type: String, default: cuid },
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: String, default: new Date().toISOString() },
    updatedAt: { type: String }
});

// export async function create(fields) {
//     const blog = await new Blog(fields)
//     await blog.save();
//     return blog;
// }



