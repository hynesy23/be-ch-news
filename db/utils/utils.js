exports.formatDates = (list, property) => {
  return list.map(element => {
    const { ...newElement } = element;
    newElement[property] = new Date(newElement[property]);
    newElement.created_at = new Date(newElement.created_at);
    console.log(newElement);
    return newElement;
  });
};

exports.makeRefObj = (list, newKey, newValue) => {
  const newRefObj = {};
  list.forEach(element => {
    newRefObj[element[newKey]] = element[newValue];
    console.log(newRefObj, "new ref object");
  });
  return newRefObj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(element => {
    const { ...newElement } = element;
    newElement.author = newElement.created_by;
    newElement.article_id = newElement.belongs_to;
    newElement.article_id = articleRef[newElement.article_id];
    newElement.created_at = new Date(newElement.created_at);
    delete newElement.belongs_to;
    delete newElement.created_by;
    return newElement;
  });
};
