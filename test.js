const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      let content;
      fs.readFileSync(path.join(dir, filename), 'utf8', function(err, data) {
        if (err) throw err;
        content = fm(data);
        console.log(content)
      });
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

//var content = mdFiles('src/blog/posts');
//console.log(content);

function log() {
  console.log('reached here');
  fs.readFile('./src/blog/posts/aws-12052018.md', 'utf8', function(err, data) {
    if (err) throw err;
    content = fm(data);
    console.log(content)
  });
}

log();

