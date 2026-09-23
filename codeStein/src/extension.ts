import * as vscode from "vscode";
import * as path from "path";
import { analyzeCommand } from "./command";
import { connectToBackend } from "./connectToBackend";
import { sendToBackend } from "./sendToBackend";
import { output } from "./utils";


async function publishWorkspace(folder: vscode.WorkspaceFolder | undefined) {
    if (!folder) {
        output.appendLine("No workspace is open.");
        return;
    }

    try {
        const result = await sendToBackend(folder.uri.fsPath);
        output.appendLine(
            `Workspace published: ${JSON.stringify(result)}`
        );
    } catch (error) {
        output.appendLine(`Could not publish workspace: ${error}`);
    }
}

export async function activate(context: vscode.ExtensionContext) {

    output.appendLine("CodeStein activated!");
    connectToBackend();

    await publishWorkspace(vscode.workspace.workspaceFolders?.[0]);

    context.subscriptions.push(
        vscode.workspace.onDidChangeWorkspaceFolders((event) => {
            void publishWorkspace(event.added[0] || vscode.workspace.workspaceFolders?.[0]);
        })
    );

    context.subscriptions.push(analyzeCommand);
}

export function deactivate() {}