import * as vscode from 'vscode';
import {MDReader} from './markdown-reader';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "markdown-to-jsx" is now active!');

	let mdReader = new MDReader();

	let disposable = vscode.commands.registerCommand('markdown-to-jsx.convertToJSX', () => {
		mdReader.readMarkdown();
	});

	context.subscriptions.push(mdReader);
	context.subscriptions.push(disposable);
}



// this method is called when your extension is deactivated
export function deactivate() {}
