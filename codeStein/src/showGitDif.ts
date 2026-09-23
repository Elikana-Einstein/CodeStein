import * as vscode from "vscode";
import { execFile } from "child_process";
import * as path from "path";

function showGitDiff() {
    const workspaceFolders = vscode.workspace.workspaceFolders; //get the folder with the project opened in vscode  
    if (!workspaceFolders) {
        vscode.window.showErrorMessage("Please open a workspace or project folder first.");
        return;
    }

    const projectRoot = workspaceFolders[0].uri.fsPath; //get the path of the first workspace folder
    const activeDocument = vscode.window.activeTextEditor?.document; //get the currently active document in the editor
    if (!activeDocument || activeDocument.uri.scheme !== "file") {
        vscode.window.showErrorMessage("Open a saved file in the workspace to view its Git diff.");
        return;
    }

    const filePath = activeDocument.uri.fsPath; //get the full path of the active document
    const relativeFilePath = path.relative(projectRoot, filePath).replace(/\\/g, "/"); //get the relative path of the file from the project root and replace backslashes with forward slashes for cross-platform compatibility
    execFile("git", ["diff", "--no-color", "--", relativeFilePath], { cwd: projectRoot }, async (error, stdout, stderr) => {
        if (error) {
            vscode.window.showErrorMessage(`Git Error: ${stderr || error.message}`);
            return;
        }

        if (!stdout.trim()) {
            vscode.window.showInformationMessage("No unstaged changes found (Clean working directory).");
            return;
        }

        try {
            const document = await vscode.workspace.openTextDocument({
                content: stdout,
                language: "diff"
            });

            await vscode.window.showTextDocument(document, {
                preview: true,
                viewColumn: vscode.ViewColumn.Beside
            });
        } catch (displayError: unknown) {
            const message = displayError instanceof Error ? displayError.message : String(displayError);
            vscode.window.showErrorMessage(`Failed to display diff: ${message}`);
        }
    });
}