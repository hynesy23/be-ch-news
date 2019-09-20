process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const connection = require("../connection");
const chaiSorted = require("chai-sorted");

chai.use(chaiSorted);

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe("/topics", () => {
    describe("GET", () => {
      it("status: 200. Should return array of all topic objects", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).to.be.an("array");
            expect(body.topics[0]).to.contain.keys("slug", "description");
          });
      });
      it("status: 404 Returns error message for a route that is not valid", () => {
        return request(app)
          .get("/api/tropics")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "This is not a valid route. Please try again"
            );
          });
      });
    });
  });
  describe("/users", () => {
    describe("GET", () => {
      it("status: 200, retuns an object with username information based on given parametric endpoint (username)", () => {
        return request(app)
          .get("/api/users/rogersop")
          .expect(200)
          .then(({ body }) => {
            expect(body.username).to.be.an("object");
            expect(body.username).to.contain.keys(
              "username",
              "avatar_url",
              "name"
            );
          });
      });
      it("status: 404, return error message when username entered is invalid", () => {
        const username = "iamnotausername";
        return request(app)
          .get(`/api/users/${username}`)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("No user found for iamnotausername");
          });
      });
    });
  });
  describe("/articles", () => {
    describe("GET", () => {
      it("status: 200, returns an article object with an array of all article objects", () => {
        return request(app)
          .get(`/api/articles`)
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.contain.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("status: 200, returns an article object based on parametric endpoint (article_id)", () => {
        const article_id = 2;
        return request(app)
          .get(`/api/articles/${article_id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an("object");
            expect(body.article).to.contain.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("status: 200, articles should be sorted by date by default", () => {
        const sort_by = "created_at";
        return request(app)
          .get(`/api/articles`)
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("created_at");
          });
      });
      it("status: 200, articles should accept query to be sorted by", () => {
        const sort_by = "author";
        return request(app)
          .get(`/api/articles?sorted_by=${sort_by}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("author");
          });
      });
      it("status: 400, returns error when attempt made to sort by column that does not exist", () => {
        const sort_by = "colour";
        return request(app)
          .get(`/api/articles?sorted_by=${sort_by}`)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "You have tried to use a column that doesn't exists"
            );
          });
      });
      it("status: 200, articles should accept an order to be ordered by", () => {
        const sort_by = "author";
        const order_by = "asc";
        return request(app)
          .get(`/api/articles?sorted_by=${sort_by}&ordered_by=${order_by}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.ascendingBy("author");
          });
      });
      it("status: 200, articles should accept 'author' query which will filter results by username", () => {
        const username = "rogersop";
        return request(app)
          .get(`/api/articles?author=${username}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.articles.length).to.equal(3);
            expect(body.articles[0].author).to.equal("rogersop");
            expect(body.articles[1].author).to.equal("rogersop");
            expect(body.articles[2].author).to.equal("rogersop");
          });
      });
      it("status: 400, returns error when attempt made to filter results by author that does not exist", () => {
        const author = "Sir Funkalot";
        return request(app)
          .get(`/api/articles?author=${author}`)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("I'm sorry, no such author exists");
          });
      });
      it("status: 200, articles should accept 'topic' query which will filter results by username", () => {
        const topic = "mitch";
        return request(app)
          .get(`/api/articles?topic=${topic}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.articles.length).to.equal(11);
            expect(body.articles[0].topic).to.equal("mitch");
            expect(body.articles[1].topic).to.equal("mitch");
            expect(body.articles[2].topic).to.equal("mitch");
            expect(body.articles[3].topic).to.equal("mitch");
            expect(body.articles[4].topic).to.equal("mitch");
            expect(body.articles[5].topic).to.equal("mitch");
            expect(body.articles[6].topic).to.equal("mitch");
            expect(body.articles[7].topic).to.equal("mitch");
            expect(body.articles[8].topic).to.equal("mitch");
            expect(body.articles[9].topic).to.equal("mitch");
            expect(body.articles[10].topic).to.equal("mitch");
          });
      });
      it("status: 400, returns error when attempt made to filter results by topic that does not exist", () => {
        const topic = "fine cuisine";
        return request(app)
          .get(`/api/articles?topic=${topic}`)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("I'm sorry, no such topic exists");
          });
      });
      it("status: 200, comment_count value should be a number", () => {
        const article_id = 2;
        return request(app)
          .get(`/api/articles/${article_id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.article.comment_count).to.be.a("number");
          });
      });
      it("status: 400 when article_id is invalid", () => {
        const article_id = "IamnotanID";
        return request(app)
          .get(`/api/articles/${article_id}`)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid type of input");
          });
      });
      it("status 404: return error message when article_id does not exist", () => {
        const article_id = 99999;
        return request(app)
          .get(`/api/articles/${article_id}`)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("No article found for id: 99999");
          });
      });
      it("status: 200, returns array of comment objects based on given article_id", () => {
        const article_id = 1;
        return request(app)
          .get(`/api/articles/${article_id}/comments`)
          .expect(200)
          .then(({ body }) => {
            expect(body.comments[0]).to.contain.keys(
              "author",
              "comments_id",
              "body",
              "created_at",
              "votes",
              "article_id"
            );
            expect(body.comments[0].article_id).to.equal(1);
          });
      });
      it("status: 200, returns empty array when there are no comments for given article_id", () => {
        const article_id = 2;
        return request(app)
          .get(`/api/articles/${article_id}/comments`)
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.eql([]);
          });
      });
      it("status: 404, returns error message when article_id is not recognised", () => {
        const article_id = 9999;
        return request(app)
          .get(`/api/articles/${article_id}/comments`)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              `No articles found for id: ${article_id}`
            );
          });
      });
      it("status: 400, returns error message when article_id is invalid", () => {
        const article_id = "iamanotanarticleID";
        return request(app)
          .get(`/api/articles/${article_id}/comments`)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid type of input");
          });
      });
      it("status: 200, comments will be sorted by 'created_at' column by default, in descending order by default", () => {
        const article_id = 1;
        return request(app)
          .get(`/api/articles/${article_id}/comments`)
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.descendingBy("created_at");
          });
      });
      it("status: 200, comments will accept a query column to be sorted by", () => {
        const article_id = 1;
        const sort_by = "votes";
        return request(app)
          .get(`/api/articles/${article_id}/comments?sorted_by=${sort_by}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.descendingBy("votes");
          });
      });
      it("status: 200, will accept order query which can be set to 'asc' or 'desc'. Given column will then be ordered by this", () => {
        const article_id = 1;
        const sort_by = "votes";
        const order_by = "asc";
        return request(app)
          .get(
            `/api/articles/${article_id}/comments?sorted_by=${sort_by}&ordered_by=${order_by}`
          )
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.ascendingBy("votes");
          });
      });
      it("status: 404, returns error when 'sort_by' column does not exist", () => {
        const article_id = 1;
        const sort_by = "colour";
        return request(app)
          .get(`/api/articles/${article_id}/comments?sorted_by=${sort_by}`)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.eql(
              "You have tried to use a column that doesn't exists"
            );
          });
      });
    });

    describe("PATCH", () => {
      it("status: 200, returns the newly amended object", () => {
        let patchBody = { inc_votes: 10 };
        const article_id = 2;
        return request(app)
          .patch(`/api/articles/${article_id}`)
          .send(patchBody)
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0]).to.contain.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at"
            );
            expect(body.article[0].votes).to.equal(10);
            patchBody = { inc_votes: -10 };
            const article_id = 2;
            return request(app)
              .patch(`/api/articles/${article_id}`)
              .send(patchBody)
              .expect(200)
              .then(({ body }) => {
                expect(body.article[0]).to.contain.keys(
                  "article_id",
                  "title",
                  "body",
                  "votes",
                  "topic",
                  "author",
                  "created_at"
                );
                expect(body.article[0].votes).to.equal(0);
              });
          });
      });
      it("status: 400, returns error message when patchBody includes incorrect type", () => {
        const patchBody = { inc_votes: "string" };
        const article_id = 2;
        return request(app)
          .patch(`/api/articles/${article_id}`)
          .send(patchBody)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid type of input");
          });
      });
      it("status: 200, returns article when patchBody is missing required fields", () => {
        const patchBody = {};
        const article_id = 2;
        return request(app)
          .patch(`/api/articles/${article_id}`)
          .send(patchBody)
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0]).to.contain.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at"
            );
          });
      });
      it("status: 400, return error message when article_id is invalid", () => {
        const patchBody = {};
        const article_id = "imnotanarticleid";
        return request(app)
          .patch(`/api/articles/${article_id}`)
          .send(patchBody)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid type of input");
          });
      });
      it("status 404, returns error message when article_id does not exist", () => {
        const patchBody = {};
        const article_id = 9999;
        return request(app)
          .patch(`/api/articles/${article_id}`)
          .send(patchBody)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("No article found for id: 9999");
          });
      });
    });
    describe("POST", () => {
      it("status: 201, Will return the posted comment", () => {
        const article_id = 2;
        const postBody = {
          username: "rogersop",
          body: "Yes, I also believe that"
        };
        return request(app)
          .post(`/api/articles/${article_id}/comments`)
          .send(postBody)
          .expect(201)
          .then(({ body }) => {
            expect(body.comment.comments_id).to.equal(19);
            expect(body.comment.author).to.equal("rogersop");
            expect(body.comment.article_id).to.equal(2);
            expect(body.comment.votes).to.equal(0);
            expect(body.comment.body).to.equal("Yes, I also believe that");
          });
      });
      it("status: 404, returns error message when article_id does not exist", () => {
        const article_id = 9999;
        const postBody = {
          username: "rogersop",
          body: "Yes, I also believe that"
        };
        return request(app)
          .post(`/api/articles/${article_id}/comments`)
          .send(postBody)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              'Key (article_id)=(9999) is not present in table "articles".'
            );
          });
      });
      it("status: 400, returns error message when article_id is invalid", () => {
        const article_id = "badarticleID";
        const postBody = {
          username: "rogersop",
          body: "Yes, I also believe that"
        };
        return request(app)
          .post(`/api/articles/${article_id}/comments`)
          .send(postBody)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid type of input");
          });
      });
      it("status: 404, returns error when postBody includes an author (username) that does not exist", () => {
        const article_id = 2;
        const postBody = {
          username: "Sir Funkalot",
          body: "Yes, I also believe that"
        };
        return request(app)
          .post(`/api/articles/${article_id}/comments`)
          .send(postBody)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              'Key (author)=(Sir Funkalot) is not present in table "users".'
            );
          });
      });
      it("status: 400, returns error when postBody includes an author (username) that does not exist", () => {
        const article_id = 2;
        const postBody = {
          username: "rogersop",
          body: "Yes, I also believe that",
          colour: "green"
        };
        return request(app)
          .post(`/api/articles/${article_id}/comments`)
          .send(postBody)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "You have tried to use a column that doesn't exists"
            );
          });
      });
    });
  });
  describe("/comments", () => {
    describe("PATCH", () => {
      it("status: 200, returns the newly amended object", () => {
        const comments_id = 2;
        const patchBody = { inc_votes: 10 };
        return request(app)
          .patch(`/api/comments/${comments_id}`)
          .send(patchBody)
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).to.contain.keys(
              "comments_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(body.comment.votes).to.equal(24);
          });
      });
      it("status: 400, returns error message when patchBody includes incorrect type", () => {
        const comments_id = 2;
        const patchBody = { inc_votes: "string" };
        return request(app)
          .patch(`/api/comments/${comments_id}`)
          .send(patchBody)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid type of input");
          });
      });
      it("status: 200, returns article when patchBody is missing required fields", () => {
        const comments_id = 2;
        const patchBody = {};
        return request(app)
          .patch(`/api/comments/${comments_id}`)
          .send(patchBody)
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).to.contain.keys(
              "comments_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(body.comment.comments_id).to.equal(2);
          });
      });
      it("status: 400, return error message when comments_id is invalid", () => {
        const comments_id = "imnotacommentid";
        const patchBody = {};
        return request(app)
          .patch(`/api/comments/${comments_id}`)
          .send(patchBody)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid type of input");
          });
      });
    });
    describe("DELETE", () => {
      it("status: 204, deletes comment by given 'comment_id'", () => {
        const comments_id = 2;
        return request(app)
          .delete(`/api/comments/${comments_id}`)
          .expect(204);
      });
      it("status: 404, return error message if attempt is made to delete comment that doesn't exist", () => {
        const comments_id = 99999;
        return request(app)
          .delete(`/api/comments/${comments_id}`)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "No such comment. There was nothing to delete..."
            );
          });
      });
    });
  });
});
