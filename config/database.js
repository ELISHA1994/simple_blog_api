import { promises as fs } from "fs";
import jsyaml  from 'js-yaml';
import Sequelize from "sequelize";


import DBG from "debug";
const log = DBG('blogs:Database-sequelize');
const error = DBG('blogs:error-sequelize');

let sequelize;
async function connectDB() {
    if (typeof sequelize === 'undefined') {
        const yamltext = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
        const params = jsyaml.load(yamltext, 'utf8');

        if (typeof process.env.SEQUELIZE_DBNAME !== 'undefined'
            && process.env.SEQUELIZE_DBNAME !== '') {
            params.dbname = process.env.SEQUELIZE_DBNAME;
        }
        if (typeof process.env.SEQUELIZE_DBUSER !== 'undefined'
            && process.env.SEQUELIZE_DBUSER !== '') {
            params.username = process.env.SEQUELIZE_DBUSER;
        }
        if (typeof process.env.SEQUELIZE_DBPASSWD !== 'undefined'
            && process.env.SEQUELIZE_DBPASSWD !== '') {
            params.password = process.env.SEQUELIZE_DBPASSWD;
        }
        if (typeof process.env.SEQUELIZE_DBHOST !== 'undefined'
            && process.env.SEQUELIZE_DBHOST !== '') {
            params.params.host = process.env.SEQUELIZE_DBHOST;
        }
        if (typeof process.env.SEQUELIZE_DBPORT !== 'undefined'
            && process.env.SEQUELIZE_DBPORT !== '') {
            params.params.port = process.env.SEQUELIZE_DBPORT;
        }
        if (typeof process.env.SEQUELIZE_DBDIALECT !== 'undefined'
            && process.env.SEQUELIZE_DBDIALECT !== '') {
            params.params.dialect = process.env.SEQUELIZE_DBDIALECT;
        }
        sequelize = new Sequelize(
            params.dbname,
            params.username,
            params.password,
            params.params,
            {logging: false}
        );

        try {
            await sequelize.authenticate({logging: false});
            log('Database Connection Established');
        } catch (err) {
            error('Unable to establish database connection', err);
        }
    }
    return sequelize
}

await connectDB();

class Blog extends Sequelize.Model {}
Blog.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { modelName: 'Blog', sequelize });

class Comment extends Sequelize.Model {}
Comment.init({
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    BlogId: {
        type: Sequelize.STRING,
    }
}, { sequelize, modelName: 'Comment' });


const model = {};
model.Blog = Blog;
model.Comment = Comment;

model.Blog.hasMany(model.Comment, { onDelete: 'CASCADE' });
model.Comment.belongsTo(model.Blog);

// comment this for first server run
// sequelize.sync({ alter: true });

export default model;
export { sequelize };


