var shell = require('shelljs');
var fs = require('fs');

fs.readFile('dependencies.json', function(err, data) {
	if (data !== undefined) {
		const fileData = JSON.parse(data);
		const dependecies = fileData.cordova;

		dependecies.forEach(val => {
			shell.exec('ionic cordova plugin add ' + val, function(code, stdout, stderr) {
				console.log('Exit code:', code);
				console.log('Program output:', stdout);
				console.log('Program stderr:', stderr);
			});
		});

	}

	if (err !== undefined && err !== null) {
		console.log("Something went wrong");
		console.log(err);
	}
});