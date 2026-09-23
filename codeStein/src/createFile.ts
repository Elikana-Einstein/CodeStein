import * as path from "path";
import * as vscode from "vscode";
import { output } from "./utils";

export async function handleFileRequests(requests: any[]) {
    for (const request of requests) {
        if (request.action !== "create" || request.type !== "file") {
            continue;
        }

        const filePath = path.join(request.path, request.name);
        const fileUri = vscode.Uri.file(filePath);

        try {
            await vscode.workspace.fs.writeFile(
                fileUri,
                Buffer.from("")
            );

            output.appendLine(`Created file: ${filePath}`);
        } catch (error) {
            output.appendLine(`Failed to create ${filePath  }:${error}`);
        }
    }
}