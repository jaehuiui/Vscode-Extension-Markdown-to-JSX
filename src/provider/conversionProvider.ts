import * as vscode from "vscode";
import { exportHtml, exportJSX } from "../lib/services/export";

export class ConversionProvider {
  public handleFile(func: string): string | undefined {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    let path = vscode.window.activeTextEditor?.document.uri.path;
    let doc = editor.document;

    if (doc.languageId === "markdown") {
      switch (func) {
        case "html": {
          return this._convertHtml(path, doc);
        }
        case "jsx": {
          return this._convertJSX(path, doc);
        }
        default: {
          return undefined;
        }
      }
    } else {
      vscode.window.showErrorMessage("Only Markdown is available");
    }
    return undefined;
  }

  private _convertHtml(
    path: string | undefined,
    doc: vscode.TextDocument
  ): string | undefined {
    return exportHtml(path, doc);
  }

  private _convertJSX(
    path: string | undefined,
    doc: vscode.TextDocument
  ): string | undefined {
    return exportJSX(path, doc);
  }

  dispose() {}
}
