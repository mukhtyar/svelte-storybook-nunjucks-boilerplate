const markdownIt = require('markdown-it');

const markdown = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});

const md = function (str, inline) {
  return !str ? '' :
    inline ? markdown.renderInline(str) : markdown.render(str);
}

module.exports = { md };