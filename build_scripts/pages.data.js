const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const glob_entries = require('webpack-glob-folder-entries');

const site = require(path.resolve(__dirname, '../src/templates/data/site.json'));

const markdownFileDir = path.resolve(__dirname, '../src/blog/posts');
const markdownFilesData = fs
    // Read directory contents
    .readdirSync(markdownFileDir)
    // Take only .md files
    .filter(filename => /\.md$/.test(filename))
    // Normalize file data.
    .map(filename => {
      return {
        ...fm(fs.readFileSync(path.join(markdownFileDir, filename), 'utf8')),
        filename,
      };
    });

const posts = markdownFilesData.map(d => d);

module.exports = {
	site,
	posts,
};
