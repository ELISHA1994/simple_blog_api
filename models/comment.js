import model from "../config/database.js";

export async function postComment(fields) {
    const {description, BlogId} = fields;
    return await model.Comment.create({
        description, BlogId: Number(BlogId)
    }, {logging: false});
}

export async function getComment(id) {
    return  await model.Comment.findOne({
        where: {id: id},
        logging: false
    })
}

export async function getBlogPostComments(BlogId) {
    const blogPostComments = await model.Comment.findAll({
        where: {BlogId: BlogId},
        logging: false
    })
    let result = [];
    blogPostComments.forEach(comment => result.push({
        description: comment.description,
        id: comment.id
    }));
    return result;
}

export async function updateComment(id, change) {
    await model.Comment.update(
        { ...change },
        {
            where: {id: id},
            logging: false
        }
    )
    return model.Comment.findOne({
        where: {id: id},
        logging: false
    })
}

export async function deleteComment(id) {
    return await model.Comment.destroy({
        where: {id: id},
        logging: false
    })
}

