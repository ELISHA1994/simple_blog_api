import model from "../config/database.js";

export async function create(fields) {
    const {title, body} = fields;
    return await model.Blog.create({
        title, body
    });
}

export async function listAllBlogs() {
    return await model.Blog.findAll()
}

export async function listBlogsPaginated(opt) {
    const {offset, limit} = opt;
    return await model.Blog.findAll({
        offset: Number(offset),
        limit: Number(limit),
    });
}

export async function getBlog(id) {
    return  await model.Blog.findOne({
        where: {id: id},
    })
}

export async function updateBlog(id, change) {
    await model.Blog.update({ ...change }, {where: {id: id}})
    return model.Blog.findOne({where: {id: id}})
}

export async function deleteBlog(id) {
    return await model.Blog.destroy({where: {id: id}})
}
