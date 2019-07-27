const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function fileList(dir) {
  return fs.readdirSync(dir).reduce(function(list, file) {
    const name = path.join(dir, file);
    const isDir = fs.statSync(name).isDirectory();
    const isJS = path.extname(name) === '.js';
    if (isDir) {
      if (name.includes('templates') || name.includes('scripts') || name.includes('blog')) {
        return list;
      } else {
        return list.concat(fileList(name));
      }
    } else {
      return list.concat([name]);
    }
  }, []);
}

const pages = {
  generatePages: function generatePages(pagesPath) {
    const files = fileList(pagesPath);
    console.log('dirs', files);
    return files.map((file) => {
      let name = path.basename(file, '.html');
      const chunkList = ['main'];
      if (name !== 'index') {
        if (name.includes('_')) {
          const split = name.split('_');
          name = `${split[0]}/${split[1]}/index`;
          if (split[0] === 'tools') {
            chunkList.push(split[1]);
          }
        } else {
          name = `${name}/index`;
        }
      }
      return new HtmlWebpackPlugin({
        template: `nunjucks-html-loader!${file}`,
        inject: 'body',
        chunks: chunkList,
        filename: `${name}.html`
      });
    }
    );
  }
};

module.exports = pages;
