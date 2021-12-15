import * as vscode from 'vscode';
import * as fs from 'fs';

import {htmlParser} from './lib/services/html-parser';

export class MDReader {

	public readMarkdown() {
		let editor = vscode.window.activeTextEditor; 
		if(!editor){ 
			return;
		}

    let path = vscode.window.activeTextEditor?.document.uri.path
		let doc = editor.document; 

		if(doc.languageId === "markdown") {
			let sample = this._sample(doc, path);
			vscode.window.showInformationMessage(sample);
		} else {
			vscode.window.showInformationMessage("Only Markdown is available");
		}
		return;
	}

	public _sample(doc: vscode.TextDocument, path: string | undefined) : string {

    if(path) {
      fs.writeFileSync(path.split('.')[0] + ".html", htmlParser(doc.getText()), 'utf8');
    }

		return htmlParser(doc.getText());
	} 

	dispose() {
		
	}
}