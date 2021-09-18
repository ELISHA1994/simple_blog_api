import Chai from "chai"
const assert = Chai.assert;
import supertest from "supertest"

const request = supertest(" http://localhost:3000")

describe('Blog API Test', function () {
    let blog;
    let comment;
    before(async function () {
        blog = await request
            .post('/blogs')
            .send({
                "title": "Test Blog Title",
                "body": "Test Blog Body"
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        const BlogId = blog.body.id
        comment = await request
            .post('/add-comments')
            .send({
                "description":"Test Comments Description",
                "BlogId": BlogId
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
    });



    after(async function () {
        const blogid = blog.body.id;
        const commentid = comment.body.id;
        await request
            .delete(`/blogs/${blogid}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        await request
            .delete(`/delete-comments/${commentid}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
    });
});
