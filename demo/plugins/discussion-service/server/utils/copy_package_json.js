const fs = require('fs')

const packageObj = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const package = { 
  name: packageObj.name,
  version: packageObj.version,
  description: packageObj.description,
  engines: packageObj.engines,
  keywords: packageObj.keywords,
  repository: packageObj.repository,
  author: packageObj.author,
  dependencies: packageObj.dependencies,
  peerDependencies: packageObj.peerDependencies,
}     
      
fs.writeFile('dist/package.json', JSON.stringify(package, null, 2), (err) => {
  if(err) console.log('writeFile failed')
})
