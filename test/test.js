import {server} from "../app";
import {sequelize} from "../config/database";
import supertest from 'supertest';
const request = supertest(server);

describe('Blog Post Endpoint Test', function () {
    beforeAll(async () => {
        await sequelize.sync({
            alter: true,
            logging: false
        });
    })

    afterAll(async () => {
        await sequelize.drop({
            logging: false
        })
    })

    it('should create a new blog post', async () => {
        const res = await request
            .post('/blog')
            .send({
                title: 'Test Title',
                body: 'Test body'
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('body');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
        expect(res.body.id).toBe(1);
        expect(res.body.title).toBe('Test Title')
        expect(res.body.body).toBe('Test body')

    });

    it('should list all blogs post', async () => {
        const res = await request
            .get('/blogs')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body.length).toBe(1);

    });

    it(`should returns a blog post with id:${1}`, async () => {
        const res = await request
            .get(`/blogs/${1}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toBe(1);
        expect(res.body.title).toBe('Test Title');
        expect(res.body.body).toBe('Test body');

    });

    it(`should update blog post with id:${1}`, async () => {
        const title = 'Update Test Title'
        const body = 'Update Test body'
        const res = await request
            .put(`/blog/${1}`)
            .send({
                title,
                body
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toBe(1);
        expect(res.body.title).toBe(title);
        expect(res.body.body).toBe(body);
    });

    it(`should delete blog post with id:${1}`, async () => {
        const res = await request
            .delete(`/blogs/${1}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('success')
    })
});

describe('Comment Endpoint Test', function () {
    let blog
    beforeAll(async () => {
        await sequelize.sync({
            alter: true,
            logging: false
        });

        blog = await request
            .post('/blog')
            .send({
                title: 'Test Title',
                body: 'Test body'
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
    });

    afterAll(async () => {
        await sequelize.drop({
            logging: false
        })
    });
    it('should post a comment on a blogpost', async () => {
        const description = 'Comment on Blogpost'
        const BlogId = blog.body.id
        const res = await request
            .post('/add-comments')
            .send({
                description,
                BlogId
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('BlogId');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
        expect(res.body.id).toBe(1);
        expect(res.body.description).toBe(description)
        expect(res.body.BlogId).toBe(BlogId)

    });

    it(`should returns a blog post with id:${1}`, async () => {
        const description = 'Comment on Blogpost'
        const BlogId = blog.body.id
        const res = await request
            .get(`/get-comment/${1}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toBe(1);
        expect(res.body.description).toBe(description);
        expect(Number(res.body.BlogId)).toBe(BlogId);
    });

    it('should get all comments on blogpost', async () => {
        const BlogId = blog.body.id
        const res = await request
            .get(`/get-all-comments-on-blogpost/${BlogId}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body.length).toBe(1);
    });

    it(`should update comments with id:${1}`, async () => {
        const description = 'Update Comment on Blogpost';
        const BlogId = blog.body.id;
        const res = await request
            .put(`/update-comments/${1}`)
            .send({
                description
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toBe(1);
        expect(res.body.description).toBe(description);
        expect(Number(res.body.BlogId)).toBe(BlogId);
    });

    it(`should delete comment with id:${1}`, async () => {
        const res = await request
            .delete(`/delete-comments/${1}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('success')
    });
});

