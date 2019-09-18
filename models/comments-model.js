const connection = require("../connection");

exports.insertACommentByArticleId = (comment, article_id) => {
  const { ...controllerComment } = comment;
  controllerComment.author = controllerComment.username;
  delete controllerComment.username;
  controllerComment.article_id = article_id;
  return connection("comments")
    .insert(controllerComment)
    .returning("*")
    .then(([controllerComment]) => {
      if (!controllerComment) {
        console.log(controllerComment, "THIS SHOULD BE FOR INVALID ID");
        return Promise.reject({
          status: 404,
          msg: `No article found for id: ${article_id}`
        });
      }
      return controllerComment;
    });
};
