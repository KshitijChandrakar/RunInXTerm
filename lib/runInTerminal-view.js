'use babel';
// function readCommands(filePath) {
//   const fs = require('fs');
//   const path = require('path');
//
// 		try {
// 				// Read the JSON file synchronously
// 				const jsonContent = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
//
// 				// Parse the JSON content into a JavaScript object
// 				const jsonObject = JSON.parse(jsonContent);
// 				// atom.notifications.addSuccess(" MEOWOWOWOWOOW" + jsonObject, { dismissable: true });
//
// 				// Return the JavaScript object
// 				return jsonObject;
// 		} catch (error) {
// 				console.error('Error reading JSON file:', error);
// 				return null; // Return null if an error occurs
// 		}
// }
import { CompositeDisposable } from 'atom'
export default class ViewB {

  // Add an event listener   to the div

  constructor(statusBar) {
    this.statusBar = statusBar
    this.subscriptions = new CompositeDisposable()

  }

  start(a) {
    this.drawElement(a)
    this.initialize()
  }

  initialize() {
    // this.subscriptions.add(atom.commands.add('atom-workspace', {
    //   'run-in-terminal:test': () => this.toggle(),
    // }))
  }

  drawElement(a) {
    console.log(a)
    this.element = document.createElement('div')
    this.element.classList.add('RunButton', 'inline-block')

    this.timeElement = document.createElement('span')
    this.timeElement.classList.add('atom-clock-time')

    this.element.appendChild(this.timeElement)
    this.element.addEventListener("click", a);


    this.statusBar.addLeftTile({
      item: this.element,
      priority: -500
    })
    this.timeElement.textContent = " Run "

  }

  toggle() {
    var style = this.element.style.display
    this.element.style.display = style === 'none' ? '' : 'none'
  }

  destroy() {
    this.clearTicker()
    this.subscriptions.dispose()
    this.tooltip.dispose()
    this.element.remove()
  }
}
