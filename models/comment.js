import model from "../config/database";

export async function postComment(fields) {
    const {description, BlogId} = fields;
    return await model.Comment.create({
        description, BlogId
    });
}

export async function getComment(id) {
    return  await model.Comment.findOne({
        where: {id: id},
    })
}

export async function getBlogPostComments(BlogId) {
    const blogPostComments = await model.Comment.findAll({
        where: {BlogId: BlogId}
    })
    let result = [];
    blogPostComments.forEach(comment => result.push({
        description: comment.description,
        id: comment.id
    }));
    return result;
}

export async function updateComment(id, change) {
    await model.Comment.update({ ...change }, {where: {id: id}})
    return model.Comment.findOne({where: {id: id}})
}

export async function deleteComment(id) {
    return await model.Comment.destroy({where: {id: id}})
}

