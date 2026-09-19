//@ts-ignore
import * as path from "path";
//@ts-ignore
import * as vscode from "vscode";

export function resolveWorkspacePath(
    relativePath: string,
    name: string
): vscode.Uri {
    const workspaceFolder =
        vscode.workspace.workspaceFolders?.[0];

    if (!workspaceFolder) {
        throw new Error(
            "No VS Code workspace is currently open."
        );
    }

    const workspaceRoot = path.resolve(
        workspaceFolder.uri.fsPath
    );

    const requestedDirectory = path.isAbsolute(relativePath)
        ? path.resolve(relativePath)
        : path.resolve(workspaceRoot, relativePath);

    const requestedPath = path.resolve(
        requestedDirectory,
        name
    );

    const relativeToWorkspace = path.relative(
        workspaceRoot,
        requestedPath
    );

    if (
        relativeToWorkspace.startsWith("..") ||
        path.isAbsolute(relativeToWorkspace)
    ) {
        throw new Error(
            "The requested path is outside the workspace."
        );
    }

    return vscode.Uri.file(requestedPath);
}