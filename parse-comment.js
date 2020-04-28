let parseComment = function(comment) {
  return comment.match(/(\B@(\w+))/gi);
}

module.exports = parseComment;
