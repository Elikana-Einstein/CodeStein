import * as vscode from "vscode";
import { sendFolderStructureToBackend, sendToBackend } from "./sendToBackend";
import { output } from "./utils";
import { getFolderStructure } from "./getFolderStructure";

export const analyzeCommand = vscode.commands.registerCommand(
    "codestein.analyze",
    async (uri: vscode.Uri) => {
        if (!uri) {
            vscode.window.showErrorMessage(
                "CodeStein: No folder selected."
            );
            return;
        }

        const folderPath = uri.fsPath;

        output.appendLine(`Selected folder: ${folderPath}`);
        output.show();

        try {
            const result = await sendToBackend(folderPath);
            const res = await sendFolderStructureToBackend(getFolderStructure());

            output.appendLine(
                `Backend response: ${JSON.stringify(result )}`
            );
            output.appendLine(
                `Folder structure: ${JSON.stringify(res)}`
            );

            vscode.window.showInformationMessage(
                "CodeStein: Analysis started."
            );

        } catch (error) {
            output.appendLine(`Backend error: ${error}`);
            vscode.window.showErrorMessage(
                "CodeStein: Failed to contact backend."
            );
        }
    }
);