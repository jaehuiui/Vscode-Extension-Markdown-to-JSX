import * as vscode from 'vscode';
import {exportHtml, exportJSX} from './lib/services/export';

export class ConversionProvider {

	public handleFile(func: string) {
		let editor = vscode.window.activeTextEditor; 
		if(!editor){ 
			return;
		}

    let path = vscode.window.activeTextEditor?.document.uri.path;
		let doc = editor.document; 

		if(doc.languageId === "markdown") {
			switch(func) {
				case 'html': {
					this._convertHtml(path, doc);
					return;
				}
				case 'jsx': {
					this._convertJSX(path, doc);
				}
				default: {
					return;
				}
			}
		} else {
			vscode.window.showErrorMessage("Only Markdown is available");
		}
		return;
	}

	public _convertHtml( path: string | undefined, doc: vscode.TextDocument) : void {
		exportHtml(path, doc);
	} 
	
	public _convertJSX( path: string | undefined, doc: vscode.TextDocument) : void {
		exportJSX(path, doc);
	} 


	dispose() {
		
	}
}