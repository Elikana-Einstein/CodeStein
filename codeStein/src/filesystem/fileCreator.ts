//@ts-ignore
import * as vscode from "vscode";

export async function createFile(
    uri: vscode.Uri,
    content = ""
): Promise<void> {
    const encoder = new TextEncoder();

    const data = encoder.encode(content);

    await vscode.workspace.fs.writeFile(
        uri,
        data
    );
}