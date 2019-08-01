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
      return {
        name: path.parse(filename).name,
        content: fs.readFileSync(path.join(dir, filename), 'utf8', function(err, data) {
          if (err) throw err;
          return fm(data);
        }),
      };
    });
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
  generateBlogPosts2: function generate(postsPath) {
    const posts = mdFiles(postsPath);
    const plugins = [];
    posts.forEach((mdFile) => {
      // Convert markdown content to HTML
      const content = marked(mdFile.content);
      //const content = marked(mdFile.content);
      console.log(`Building makdown file: ${mdFile.name}.md...`);
      console.log(content.meta)
      plugins.push(new HtmlWebpackPlugin({
        template: `nunjucks-html-loader!src/templates/partials/blog-post.html`,
        chunks: ['main'],
        inject: true,
        filename: `blog/posts/${mdFile.name}.html`,
        title: content.meta.title,
      }));
    });
    return plugins;
  },
  generateBlogPosts: function generate(postsPath) {
    const posts = mdFiles(postsPath);
    const plugins = [];
    posts.forEach((mdFile) => {
      // Convert markdown content to HTML
      const content = marked(mdFile.content);
      //const content = marked(mdFile.content);
      console.log(`Building makdown file: ${mdFile.name}.md...`);
      console.log(content.meta)
      plugins.push(new HtmlWebpackPlugin({
        template: `nunjucks-html-loader!src/templates/partials/blog-post.html`,
        chunks: ['main'],
        inject: true,
        filename: `blog/posts/${mdFile.name}.html`,
        title: content.meta.title,
      }));
    });
    return plugins;
  },
};

module.exports = pages;
