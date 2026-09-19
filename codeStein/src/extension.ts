import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {

    console.log("CodeStein activated!");

   const analyzeCommand = vscode.commands.registerCommand(
    "codestein.analyze",
    async (uri: vscode.Uri) => {

        const output =
            vscode.window.createOutputChannel("CodeStein");

        if (!uri) {
            output.appendLine("No folder was selected.");
            output.show();
            return;
        }

        const folderPath = uri.fsPath;

        output.appendLine(
            `Selected folder: ${folderPath}`
        );

        output.show();

        vscode.window.showInformationMessage(
            `Analyzing: ${folderPath}`
        );
    }
);

    context.subscriptions.push(analyzeCommand);
}

export function deactivate() {}