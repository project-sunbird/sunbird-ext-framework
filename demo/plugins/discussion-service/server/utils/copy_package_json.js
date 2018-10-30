const fs = require('fs')
const _ =  require('lodash');
const packageObj = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const package = _.pick(packageObj, ['name', 'version', 'description', 'engines', 'keywords', 'repository', 'author', 'dependencies', 'peerDependencies']);

fs.writeFile('dist/package.json', JSON.stringify(package, null, 2), (err) => {
  if (err) console.log('writeFile failed')
});
