import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export interface FolderStructure {
    name: string;
    type: "folder" | "file";
    children: FolderStructure[];
}

export function getFolderStructure(): FolderStructure  {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
        vscode.window.showErrorMessage(
            "Please open a workspace or project folder first."
        );
        return {
            name: "",
            type: "folder",
            children: []
        };
    }

    const projectRoot = workspaceFolders[0].uri.fsPath;

    function buildStructure(directory: string): FolderStructure {
        const name = path.basename(directory);

        const children = fs
            .readdirSync(directory, { withFileTypes: true })
            .map((entry) => {
                const fullPath = path.join(directory, entry.name);

                if (entry.isDirectory() && entry.name !== "node_modules") {
                    return {
                        ...buildStructure(fullPath),
                        type: "folder" as const,
                    };
                }

                return {
                    name: entry.name,
                    type: "file" as const,
                    children: [],
                };
            });

        return {
            name,
            type: "folder",
            children,
        };
    }

    return buildStructure(projectRoot);
}