const markdownIt = require('markdown-it');
const d3Time = require('d3-time-format');

// Filter to format date
const formatDate = function (date, format = '%B %d, %Y') {
	const formatTime = d3Time.timeFormat(format);
	return formatTime(date);
};

// Filter to render markdown
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