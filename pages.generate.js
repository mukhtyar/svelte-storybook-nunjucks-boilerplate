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


const pages = {
  generateTopLevelPages: function generate(pagesPath) {
    const topLevelFiles = returnFileList(pagesPath);
    const chunks = ['main'];
    return topLevelFiles.map((file) => {
      let name = path.basename(file, '.html');
      if (name !== 'index') {
        name = `${name}/index`;
      }
      return new HtmlWebpackPlugin({
        template: file,
        chunks,
        filename: `${name}.html`,
        context: { md: '', title: 'My Inserted Title' },
      });
    });
  },
  generateSecondLevelPages: function generate(pagesPath, entryPoints) {
    const folderPaths = returnSubFolders(pagesPath);
    const plugins = [];
    folderPaths.forEach((folderPath) => {
      const folderName = path.basename(folderPath);
      const fileList = returnFileList(folderPath);
      fileList.forEach((file) => {
        const name = path.basename(file, '.html');
        const chunks = ['main'];
        if (Object.keys(entryPoints).includes(name)) {
          chunks.push(name);
        }
        plugins.push(new HtmlWebpackPlugin({
          template: file,
          chunks,
          filename: `${folderName}/${name}/index.html`,
        }));
      });
    });
    return plugins;
  },
  generateBlogPostPages: function generate(blogPath, posts) {
    const topLevelFiles = returnFileList(blogPath);
    const chunks = ['main'];
    return topLevelFiles.map((file) => {
      const name = path.basename(file);
      const post = posts.find(d => d.filename === name);
      return new HtmlWebpackPlugin({
        template: './src/templates/partials/blog-post.html',
        chunks,
        filename: `${post.attributes.permalink}/index.html`,
      });
    });
  },
};

module.exports = pages;
