import model from "../config/database.js";

export async function create(fields) {
    const {title, body} = fields;
    return await model.Blog.create({
        title, body
    }, {logging: false});
}

export async function listAllBlogs() {
    return await model.Blog.findAll({logging: false})
}

export async function listBlogsPaginated(opt) {
    const {offset, limit} = opt;
    return await model.Blog.findAll({
        offset: Number(offset),
        limit: Number(limit),
        logging: false
    });
}

export async function getBlog(id) {
    return  await model.Blog.findOne({
        where: {id: id},
        logging: false
    })
}

export async function updateBlog(id, change) {
    await model.Blog.update(
        { ...change },
        {
            where: {id: id},
            logging: false
        }
    )
    return model.Blog.findOne({
        where: {id: id},
        logging: false
    })
}

export async function deleteBlog(id) {
    return await model.Blog.destroy({
        where: {id: id},
        logging: false
    })
}
