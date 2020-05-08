let parseComment = function(comment) {
  const matches = comment.match(/(\B@(\w+))/gi);
  return matches && matches.length ? matches.map(result => result.replace('@','')) : matches;
}

module.exports = parseComment;
