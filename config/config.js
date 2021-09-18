export default {
    "swagger": "2.0",
    "info": {
        "version": "3.0.0",
        "title": "BLOG API DOCUMENTATION",
        "description": "This provides an appropriate documentation on how to consume the api.",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    "host": "localhost:4000",
    "basePath": "/",
    "tags": [
        {
            "name": "Blogs",
            "description": "API for blogs in the system"
        }
    ],
    "schemes": ["http"],
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "paths": {
        "/blogs": {
            "get": {
                "tags": ["Blogs"],
                "summary": "Retrieves all blogs in the system",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Blogs"
                        }
                    }
                }
            }
        },
        "/blog": {
            "post": {
                "tags": ["Blogs"],
                "description": "Create a new post in the system",
                "summary": "Create a new post in the system",
                "parameters": [
                    {
                        "name": "blog",
                        "in": "body",
                        "description": "The blog to be posted",
                        "schema": {
                            "$ref": "#/definitions/Blog"
                        }
                    }
                ],
                "produces": ["application/json"],
                "responses": {
                    "200": {
                        "description": "Blog post saved successfully",
                        "schema": {
                            "$ref": "#/definitions/Blog"
                        }
                    }
                }
            }
        },
        "/blog/{id}": {
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "id of the blog post we want to update",
                    "type": "integer"
                }
            ],
            "put": {
                "summary": "Update Post with the given id",
                "tags": ["Blogs"],
                "parameters": [{
                    "name": "blog",
                    "in": "body",
                    "description": "Post including update",
                    "schema": {
                        "$ref": "#/definitions/Blog"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Blog Post is updated successfully",
                        "schema": {
                            "$ref": "#/definitions/Blog"
                        }
                    }
                }
            }
        },
        "/blogs/{id}": {
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "id of the blog post we want to delete",
                    "type": "integer"
                }
            ],
            "delete": {
                "summary": "Delete Post with current id",
                "tags": ["Blogs"],
                "responses": {
                    "200": {
                        "description": "Blog Post is deleted successfully",
                        "schema": {
                            "$ref": "#/definitions/Blog"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "Blog": {
            "required": ["title", "body"],
            "properties": {
                "title": {
                    "type": "string"
                },
                "body": {
                    "type": "string"
                }
            }
        },
        "Blogs": {
            "type": "array",
            "$ref": "#/definitions/Blog"
        }
    }
}
