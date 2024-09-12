function readCommands(filePath1) {
  console.log(filePath1())
  const fs = require('fs');
  const path = require('path');
  const rawr = 1;
		try {
				// Read the JSON file synchronously
				const jsonContent = fs.readFileSync(path.join(__dirname, filePath), 'utf8');

				// Parse the JSON content into a JavaScript object
				const jsonObject = JSON.parse(jsonContent);
				// atom.notifications.addSuccess(" MEOWOWOWOWOOW" + jsonObject, { dismissable: true });

				// Return the JavaScript object
				return jsonObject;
		} catch (error) {
				console.error('Error reading JSON file:', error);
				return null; // Return null if an error occurs
		}
}
function aa(){
  return "111"
}
function b(a){
  return a();
}

console.log(b(aa))
