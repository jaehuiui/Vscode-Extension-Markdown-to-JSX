import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "markdown-to-jsx" is now active!');

	let mdReader = new MDReader();

	let disposable = vscode.commands.registerCommand('markdown-to-jsx.convertToJSX', () => {
		mdReader.readMarkdown();
	});

	context.subscriptions.push(mdReader);
	context.subscriptions.push(disposable);
}

class MDReader {

	public readMarkdown() {
		let editor = vscode.window.activeTextEditor; 
		if(!editor){ 
			return;
		}

		let doc = editor.document; 

		if(doc.languageId === "markdown") {
			let sample = this._sample(doc);
			vscode.window.showInformationMessage(sample);
		} else {
			vscode.window.showInformationMessage("Only Markdown is available");
		}
		return;
	}

	public _sample(doc: vscode.TextDocument): string {
		console.log("sample");
		return 'hi';
	} 

	dispose() {
		
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
