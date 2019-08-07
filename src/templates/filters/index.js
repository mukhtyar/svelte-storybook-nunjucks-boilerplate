const markdownIt = require('markdown-it');
const d3Time = require('d3-time-format');

const formatTime = d3Time.timeFormat('%B %d, %Y');
const formatDate = function (date, format = formatTime) {
	return format(date);
};

const markdown = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});

const md = function (str, inline) {
  return !str ? '' :
    inline ? markdown.renderInline(str) : markdown.render(str);
};

module.exports = { md, formatDate };