//@ts-ignore
import * as vscode from "vscode";

export async function createFolder(
    uri: vscode.Uri
): Promise<void> {
    await vscode.workspace.fs.createDirectory(uri);
}