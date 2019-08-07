const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const glob_entries = require('webpack-glob-folder-entries');

// Sort dates, dates will be cast to numbers
function sortByDateDescending(a, b) {
  return b.attributes.date - a.attributes.date;
}

// Get site data
const site = require(path.resolve(__dirname, '../src/templates/data/site.json'));

// Get posts
const markdownFileDir = path.resolve(__dirname, '../src/blog/posts');
const markdownFilesData = fs
    // Read directory contents
    .readdirSync(markdownFileDir)
    // Take only .md files
    .filter(filename => /\.md$/.test(filename))
    // Return filename and contents of markdown file
    .map(filename => {
      return {
        ...fm(fs.readFileSync(path.join(markdownFileDir, filename), 'utf8')),
        filename,
      };
    });

const posts = markdownFilesData.map(d => d).sort(sortByDateDescending);


// Exported data is injected into Nunjucks context
// If you make any changes to the data, you will need to restart webpack
module.exports = {
	site,
	posts,
};
