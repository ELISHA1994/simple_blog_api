import database from "../config/database"
import cuid from "cuid";

const Comment = database.model('Blog', {
    _id: { type: String, default: cuid },
    description: { type: String, required: true },
    blogID: { type: String, ref: 'Blog', required: true }
});
