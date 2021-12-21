import * as vscode from "vscode";
import { ConversionProvider } from "./provider/conversionProvider";
import { FSP } from "./provider/fsSystemProvider";

export async function activate(context: vscode.ExtensionContext) {
  console.log("Markdown to JSX is activated");

  const conversionProvider = new ConversionProvider();
  const fileSystemProvider = new FSP();

  context.subscriptions.push(
    vscode.workspace.registerFileSystemProvider("mdJSX", fileSystemProvider, {
      isCaseSensitive: true,
    })
  );
  context.subscriptions.push(conversionProvider);

  context.subscriptions.push(
    vscode.commands.registerCommand("markdown-to-jsx.initialize", () => {
      vscode.workspace.updateWorkspaceFolders(0, 0, {
        uri: vscode.Uri.parse("mdJSX:/"),
        name: "MD2JSX",
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("markdown-to-jsx.convertToJSX", () => {
      const jsxData = conversionProvider.handleFile("jsx");

      if (jsxData) {
        fileSystemProvider.writeFile(
          vscode.Uri.parse(`mdJSX:/output.jsx`),
          Buffer.from(jsxData),
          { create: true, overwrite: true }
        );
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("markdown-to-jsx.convertToHtml", () => {
      const htmlData = conversionProvider.handleFile("html");

      if (htmlData) {
        fileSystemProvider.writeFile(
          vscode.Uri.parse(`mdJSX:/output.html`),
          Buffer.from(htmlData),
          { create: true, overwrite: true }
        );
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
