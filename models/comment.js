// import {Comment, connectDB} from "./blog"
//
// import DBG from 'debug';
//
// const debug = DBG('blogs:blog-model');
// const error = DBG('blogs:error-model');
//
// export async function create(fields) {
//     const { BlogId, description} = fields;
//     await connectDB();
//     const newBlog = await Comment.create({
//         BlogId,
//         description
//     });
//     return {...newBlog};
//
// }
//
// // let sequelize;
// // export class Comment extends  Sequelize.Model {}
// //
// // async function connectDB() {
// //     if (sequelize) return;
// //     sequelize = await databaseConnection();
// //
// //     Comment.init({
// //         description: {
// //             type: Sequelize.STRING,
// //             allowNull: false
// //         },
// //         blogID: {
// //             type: Sequelize.STRING,
// //             allowNull: false
// //         }
// //     }, {
// //         sequelize,
// //         modelName: 'Comment'
// //     });
// //     await Comment.sync({ alter: true });
// // }
// //
//
//
//
//
// // import database from "../config/database"
// // import cuid from "cuid";
// //
// // const Comment = database.model('Blog', {
// //     _id: { type: String, default: cuid },
// //     description: { type: String, required: true },
// //     blogID: { type: String, ref: 'Blog', required: true }
// // });

export default function (DataTypes, Model, Sequelize) {
    class Comment extends Model {}
    Comment.init({
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { Sequelize, modelName: 'Comment' });
    return Comment;
}
