const { CompositeDisposable } = require("atom");
const path = require('path');
const { Disposable } = require("atom");
const ViewB = require('./runInTerminal-view');
function readCommands(filePath) {
  const fs = require('fs');
  const path = require('path');

		try {
				// Read the JSON file synchronously
				const jsonContent = fs.readFileSync(path.join(__dirname, filePath), 'utf8');

				// Parse the JSON content into a JavaScript object
				const jsonObject = JSON.parse(jsonContent);

				// Return the JavaScript object
				return jsonObject;
		} catch (error) {
				console.error('Error reading JSON file:', error);
				return null; // Return null if an error occurs
		}
}
module.exports = {
	subscriptions: null,
  terminalService: null,

  activate() {
    this.subscriptions = new CompositeDisposable();
		this.subscriptions.add(atom.commands.add("atom-workspace", { "run-in-terminal:run": () => this.run()}));
    this.subscriptions.add(atom.commands.add("atom-workspace", { "run-in-terminal:TestTerminal": () => this.terminalTest()}));
    this.subscriptions.add(atom.commands.add("atom-workspace", {"run-in-terminal:Test": () => this.test()}));
  },


  consumeTerminalService (terminalService) {
    this.terminalService = terminalService
    return new Disposable(() => {
      this.terminalService = null
    })
  },

  run(){
  // Get the current active text editor
  const editor = atom.workspace.getActiveTextEditor();
  if (editor) {
  	// Get the path of the current editor's file
  	const filePath = editor.getPath()
    const language = editor.getGrammar().name
  	if (filePath && language) {
  		try{
        const commands = readCommands("commands.json")
  			if(language in commands){
          command = commands[language]
          // atom.notifications.addSuccess("language is " + language + " " + JSON.stringify(command), { dismissable: true });
  				this.terminalService.run([
  					commands[language].Prefix + " '" + filePath + "' " + commands[language].Suffix
  				])}
  		 	else {
  				atom.notifications.addSuccess(language + " Hasn't been added yet,  Running anyway", { dismissable: true });
  					this.terminalService.run([
  						"./'" + filePath + "'"
  					])}
  		} catch(TypeError){
  			atom.notifications.addSuccess(language + " Hasn't been added yet (TypeError)", { dismissable: true });
        console.log(TypeError)
  		}
  	} else {
  		atom.notifications.addSuccess(" File Not Found", { dismissable: true });
  	}
   }
  },
  consumeStatusBar(statusBar) {
    this.statusBar = statusBar
    this.ViewB = new ViewB(statusBar)
    this.ViewB.start(this.run.bind(this))
  },

	terminalTest(){
    this.terminalService.run([
       'echo "HELLO FUCKAAAAAAAAAAS"'
    ])
  },

  pewpew(){
    atom.notifications.addSuccess("Pew Pew Pew Pew!!!", { dismissable: true });
  },

	deactivate() {
    this.tooltip.dispose()
    this.element.remove()
    if (this.atomClockView)
      this.atomClockView.destroy()
		this.subscriptions.dispose();
	},

	test() {
		console.log("Convert text!");
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {editor.insertText('Hello, World!');}
	},
};
