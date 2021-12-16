import * as vscode from 'vscode';
import * as fs from 'fs';
import { htmlParser } from './html-parser';
import {importSection, renderSection} from './jsx-parser';


export function exportHtml(path: string | undefined, data: vscode.TextDocument): void {
  try {
    if(path) {
      fs.writeFileSync(path.split('.')[0] + ".html", htmlParser(data.getText()), 'utf8');
      vscode.window.showInformationMessage("Export Html Completed successfully");
    }
  } catch (err) {
    vscode.window.showErrorMessage("Error Occurred while exporting html file");
  }
}

export function exportJSX(path: string | undefined, data: vscode.TextDocument): void {
  try {
    if(path) {
      let parsedHtml = htmlParser(data.getText());
      let parsedJSX = importSection + renderSection(parsedHtml);
      fs.writeFileSync(path.split('.')[0] + ".jsx", parsedJSX, 'utf8');
    }
  } catch (err) {
    vscode.window.showErrorMessage("Error Occurred while exporting JSX file");
  }
}