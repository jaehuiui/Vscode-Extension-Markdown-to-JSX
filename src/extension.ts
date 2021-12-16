import * as vscode from 'vscode';
import {ConversionProvider} from './conversionProvider';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "markdown-to-jsx" is now active!');

	let conversionProvider = new ConversionProvider();

	context.subscriptions.push(conversionProvider);

	context.subscriptions.push(vscode.commands.registerCommand('markdown-to-jsx.convertToJSX', () => {
		conversionProvider.handleFile('jsx');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('markdown-to-jsx.convertToHtml', () => {
		conversionProvider.handleFile('html');
	}));
}



// this method is called when your extension is deactivated
export function deactivate() {}
