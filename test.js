const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const marked = require('meta-marked');

// Returns list of subdirectories in a directory
function returnSubFolders(dir){
  return fs.readdirSync(dir).reduce(function(list, file) {
    const name = path.join(dir, file);
    const isDir = fs.statSync(name).isDirectory();
    if (isDir) {
      list.push(name);
    }
    return list;
  }, []);
}

// Returns list of files in a directory
function returnFileList(dir) {
  return fs.readdirSync(dir).reduce(function(list, file) {
    const name = path.join(dir, file);
    const isDir = fs.statSync(name).isDirectory();
    if (!isDir) {
      list.push(name);
    }
    return list;
  }, []);
}

// Returns object representations of markdown files in a directory
function mdFiles(dir) {
  return fs
    // Read directory contents
    .readdirSync(dir)
    // Take only .md files
    .filter(filename => /\.md$/.test(filename))
    // Normalize file data,
    // and write it to the array
    .map(filename => {
      return {
        name: path.parse(filename).name,
        content: fs.readFileSync(path.join(dir, filename), 'utf8')
      };
    });
}

function generateBlogPosts(postsPath) {
  const posts = mdFiles(postsPath);
  posts.forEach((mdFile) => {
    // Convert markdown content to HTML
    const content = marked(mdFile.content);
    //const content = marked(mdFile.content);
    console.log(`Building makdown file: ${mdFile.name}.md...`)
    console.log(content.meta)
  })
};

generateBlogPosts('src/blog/posts');
