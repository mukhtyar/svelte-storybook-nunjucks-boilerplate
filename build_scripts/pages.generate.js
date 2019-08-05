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
  generateBlogIndexPage: function generate(blogPath) {
    return new HtmlWebpackPlugin({
      template: path.resolve(blogPath, 'blog-index.html'),
      chunks: ['main'],
      filename: `blog/index.html`,
    });
  },
  generateBlogPostPages: function generate(blogPath, posts) {
    const templateFile = path.resolve(blogPath, 'blog-post.html');
    console.log('blog', templateFile);
    const markdownFiles = returnFileList(path.resolve(blogPath, 'posts'));
    const chunks = ['main'];
    return markdownFiles.map((file) => {
      const name = path.basename(file);
      const post = posts.find(d => d.filename === name);
      return new HtmlWebpackPlugin({
        template: templateFile,
        chunks,
        filename: `blog/posts/${post.attributes.permalink}/index.html`,
      });
    });
  },
};

module.exports = pages;
