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
    it("GET: 200. Should return array of all topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.be.an("array");
          expect(body.topics[0]).to.contain.keys("slug", "description");
        });
    });
    it("GET: 404 Returns error message for a route that is not valid", () => {
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
  describe("/users", () => {
    it("GET: 200, retuns an object with username information based on given parametric endpoint (username)", () => {
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
    it("GET: 404, return error message when username entered is invalid", () => {
      const username = "iamnotausername";
      return request(app)
        .get(`/api/users/${username}`)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("No user found for iamnotausername");
        });
    });
  });
  describe("/articles", () => {
    it("GET: 200, returns an article object based on parametric endpoint (article_id)", () => {
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
    it("GET: 200, articles should be sorted by date by default", () => {
      const sort_by = "created_at";
      return request(app)
        .get(`/api/articles`)
        .expect(200)
        .then(({ body }) => {
          console.log(body, "LOG OF BODY FROM TEST");
          expect(body.articles).to.be.descendingBy("created_at");
        });
    });
    it("GET: 200, articles should accept query to be sorted by", () => {
      const sort_by = "author";
      return request(app)
        .get(`/api/articles?sorted_by=${sort_by}`)
        .expect(200)
        .then(({ body }) => {
          console.log(body, "LOG OF BODY FROM TEST");
          expect(body.articles).to.be.descendingBy("author");
        });
    });
    it.only("GET: 200, articles should accept an order to be ordered by", () => {
      const sort_by = "author";
      const order_by = "asc";
      return request(app)
        .get(`/api/articles?sorted_by=${sort_by}&ordered_by=${order_by}`)
        .expect(200)
        .then(({ body }) => {
          console.log(body, "LOG OF BODY FROM TEST");
          expect(body.articles).to.be.ascendingBy("author");
        });
    });
    it("GET: 200, comment_count value should be a number", () => {
      const article_id = 2;
      return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.article.comment_count).to.be.a("number");
        });
    });
    it("GET: 400 when article_id is invalid", () => {
      const article_id = "IamnotanID";
      return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Invalid type of input");
        });
    });
    it("GET 404: return error message when article_id does not exist", () => {
      const article_id = 99999;
      return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("No article found for id: 99999");
        });
    });
    it("PATCH: 200, returns the newly amended object", () => {
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
    it("PATCH: 400, returns error message when patchBody includes incorrect type", () => {
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
    it("PATCH: 200, returns article when patchBody is missing required fields", () => {
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
    it("PATCH: 400, return error message when article_id is invalid", () => {
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
    it("PATCH 404, returns error message when article_id does not exist", () => {
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
    it("POST: 201, Will return the posted comment", () => {
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
    it("POST 404, returns error message when article_id does not exist", () => {
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
    it("POST: 400, returns error message when article_id is invalid", () => {
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
    it("POST: 404, returns error when postBody includes an author (username) that does not exist", () => {
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
    it("POST: 400, returns error when postBody includes an author (username) that does not exist", () => {
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
    it("GET: 200, returns array of comment objects based on given article_id", () => {
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
    it("GET: 200, returns empty array when there are no comments for given article_id", () => {
      const article_id = 2;
      return request(app)
        .get(`/api/articles/${article_id}/comments`)
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.eql([]);
        });
    });
    it("GET: 404, returns error message when article_id is not recognised", () => {
      const article_id = 9999;
      return request(app)
        .get(`/api/articles/${article_id}/comments`)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal(`No articles found for id: ${article_id}`);
        });
    });
    it("GET: 400, returns error message when article_id is invalid", () => {
      const article_id = "iamanotanarticleID";
      return request(app)
        .get(`/api/articles/${article_id}/comments`)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Invalid type of input");
        });
    });
    it("GET: 200, comments will be sorted by 'created_at' column by default, in descending order by default", () => {
      const article_id = 1;
      return request(app)
        .get(`/api/articles/${article_id}/comments`)
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.descendingBy("created_at");
        });
    });
    it("GET: 200, comments will accept a query column to be sorted by", () => {
      const article_id = 1;
      const sort_by = "votes";
      return request(app)
        .get(`/api/articles/${article_id}/comments?sorted_by=${sort_by}`)
        .expect(200)
        .then(({ body }) => {
          console.log(body.comments, "BODY.COMMENTS LOG FORM TEST");
          expect(body.comments).to.be.descendingBy("votes");
        });
    });
    it("Will accept order query which can be set to 'asc' or 'desc'. Given column will then be ordered by this", () => {
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
    it("GET: 404, returns error when 'sort_by' column does not exist", () => {
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
});
