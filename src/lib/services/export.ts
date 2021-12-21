import * as vscode from "vscode";
import * as fs from "fs";
import { htmlParser } from "./html-parser";
import { importSection, renderSection } from "./jsx-parser";

export function exportHtml(
  path: string | undefined,
  data: vscode.TextDocument
): string | undefined {
  try {
    if (path) {
      vscode.window.showInformationMessage(
        "Export Html Completed successfully"
      );
      return htmlParser(data.getText());
      // fs.writeFileSync(path.split('.')[0] + ".html", htmlParser(data.getText()), 'utf8');
    }
  } catch (err) {
    vscode.window.showErrorMessage("Error Occurred while exporting html file");
  }
  return undefined;
}

export function exportJSX(
  path: string | undefined,
  data: vscode.TextDocument
): string | undefined {
  try {
    if (path) {
      let parsedHtml = htmlParser(data.getText());
      return importSection + renderSection(parsedHtml);
      // fs.writeFileSync(path.split(".")[0] + ".jsx", parsedJSX, "utf8");
    }
  } catch (err) {
    vscode.window.showErrorMessage("Error Occurred while exporting JSX file");
  }
  return undefined;
}
