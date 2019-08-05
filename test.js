const path = require('path');

console.log(path.resolve());
console.log(__dirname);
console.log(path.resolve(__dirname));
console.log(path.resolve(__dirname, 'src/templates/data/site.json'));

//console.log(path.join(__dirname, 'blog'));